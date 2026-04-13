import { Injectable, Logger } from '@nestjs/common';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  isAfter,
  subDays,
} from 'date-fns';
import { CommitsService, type CommitView } from '../commits/commits.service';
import { GithubService } from '../github/github.service';
import { LlmService } from '../llm/llm.service';
import { RepositoriesService } from '../repositories/repositories.service';
import { SettingsService } from '../settings/settings.service';
import { SummariesService } from '../summaries/summaries.service';
import { SummaryType } from '../summaries/schemas/summary.schema';
import { buildWeeklyPrompt } from '../llm/prompts/weekly.prompt';
import { buildMonthlyPrompt } from '../llm/prompts/monthly.prompt';
import { buildYearlyPrompt } from '../llm/prompts/yearly.prompt';

export interface SyncResult {
  startedAt: Date;
  completedAt: Date;
  reposSynced: number;
  newCommits: number;
  summariesGenerated: string[];
  errors: string[];
}

const BOOTSTRAP_DAYS = 30;
const CONCURRENCY_LIMIT = 5;
const WEEK_STARTS_ON = 0 as const;

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    private readonly settingsService: SettingsService,
    private readonly githubService: GithubService,
    private readonly commitsService: CommitsService,
    private readonly repositoriesService: RepositoriesService,
    private readonly summariesService: SummariesService,
    private readonly llmService: LlmService,
  ) {}

  async runSync(): Promise<SyncResult> {
    const startedAt = new Date();
    const errors: string[] = [];
    const summariesGenerated: string[] = [];

    this.logger.log('Starting sync...');

    const settings = await this.settingsService.getSettings();
    const { githubToken, trackedRepos, llm } = settings;
    const lastSyncDate =
      settings.lastSyncDate ?? subDays(new Date(), BOOTSTRAP_DAYS);

    this.logger.log(
      `Syncing ${trackedRepos.length} repos since ${lastSyncDate.toISOString()}`,
    );

    // --- Step 1: Fetch commits from GitHub in parallel (concurrency limited) ---
    let totalNewCommits = 0;

    for (let i = 0; i < trackedRepos.length; i += CONCURRENCY_LIMIT) {
      const batch = trackedRepos.slice(i, i + CONCURRENCY_LIMIT);

      await Promise.all(
        batch.map(async (fullName) => {
          try {
            const githubCommits = await this.githubService.fetchCommitsSince(
              githubToken,
              fullName,
              lastSyncDate,
            );

            if (githubCommits.length === 0) return;

            let repo = await this.repositoriesService.findByFullName(fullName);
            if (!repo) {
              const meta = await this.githubService.getRepoMetadata(githubToken, fullName);
              repo = await this.repositoriesService.create({ fullName });
              await this.repositoriesService.update(repo._id.toString(), meta);
            }

            const repoId = repo._id.toString();
            const newCommitsData = githubCommits.map((c) => ({
              repoId,
              repoName: repo!.name,
              hash: c.hash,
              message: c.message,
              author: c.author,
              committedAt: c.committedAt,
              githubUrl: c.githubUrl,
            }));

            const upserted = await this.commitsService.bulkUpsert(newCommitsData);
            totalNewCommits += upserted;

            const total = await this.commitsService.countForPeriod(
              new Date(0),
              new Date(),
            );
            await this.repositoriesService.setCommitCount(repoId, total);

            this.logger.log(`${fullName}: ${upserted} new commits`);
          } catch (err) {
            const msg = `Failed to sync ${fullName}: ${String(err)}`;
            this.logger.error(msg);
            errors.push(msg);
          }
        }),
      );
    }

    // --- Step 2: Generate missing summaries ---
    const now = new Date();

    const periods = [
      ...this.getCompletedYearPeriods(lastSyncDate, now),
      ...this.getCompletedMonthPeriods(lastSyncDate, now),
      ...this.getCompletedWeekPeriods(lastSyncDate, now),
    ];

    for (const period of periods) {
      try {
        const exists = await this.summariesService.existsForPeriod(
          period.type,
          period.start,
          period.end,
        );
        if (exists) continue;

        const commits = await this.commitsService.getForPeriod(period.start, period.end);
        if (commits.length === 0) continue;

        const prompt = this.buildPrompt(period.type, commits, period.start, period.end);
        const content = await this.llmService.generate(prompt, llm);

        await this.summariesService.create({
          type: period.type,
          periodStart: period.start,
          periodEnd: period.end,
          content,
          modelUsed: llm.model || 'mistral-small-latest',
        });

        const label = `${period.type}:${period.start.toISOString().slice(0, 10)}`;
        summariesGenerated.push(label);
        this.logger.log(`Generated ${label} summary`);
      } catch (err) {
        const msg = `Failed to generate summary for ${period.type} ${period.start.toISOString().slice(0, 10)}: ${String(err)}`;
        this.logger.error(msg);
        errors.push(msg);
      }
    }

    // --- Step 3: Update lastSyncDate ---
    await this.settingsService.update({ lastSyncDate: now });

    const completedAt = new Date();
    this.logger.log(
      `Sync complete: ${totalNewCommits} new commits, ${summariesGenerated.length} summaries generated`,
    );

    return {
      startedAt,
      completedAt,
      reposSynced: trackedRepos.length,
      newCommits: totalNewCommits,
      summariesGenerated,
      errors,
    };
  }

  private buildPrompt(
    type: SummaryType,
    commits: CommitView[],
    periodStart: Date,
    periodEnd: Date,
  ): string {
    switch (type) {
      case SummaryType.WEEKLY:
        return buildWeeklyPrompt(commits, periodStart, periodEnd);
      case SummaryType.MONTHLY:
        return buildMonthlyPrompt(commits, periodStart, periodEnd);
      case SummaryType.YEARLY:
        return buildYearlyPrompt(commits, periodStart, periodEnd);
    }
  }

  private getCompletedWeekPeriods(
    since: Date,
    now: Date,
  ): Array<{ type: SummaryType; start: Date; end: Date }> {
    const weekStarts = eachWeekOfInterval(
      { start: since, end: now },
      { weekStartsOn: WEEK_STARTS_ON },
    );
    return weekStarts
      .map((ws) => ({
        type: SummaryType.WEEKLY ,
        start: startOfWeek(ws, { weekStartsOn: WEEK_STARTS_ON }),
        end: endOfWeek(ws, { weekStartsOn: WEEK_STARTS_ON }),
      }))
      .filter((p) => isAfter(now, p.end));
  }

  private getCompletedMonthPeriods(
    since: Date,
    now: Date,
  ): Array<{ type: SummaryType; start: Date; end: Date }> {
    const monthStarts = eachMonthOfInterval({ start: since, end: now });
    return monthStarts
      .map((ms) => ({
        type: SummaryType.MONTHLY ,
        start: startOfMonth(ms),
        end: endOfMonth(ms),
      }))
      .filter((p) => isAfter(now, p.end));
  }

  private getCompletedYearPeriods(
    since: Date,
    now: Date,
  ): Array<{ type: SummaryType; start: Date; end: Date }> {
    const yearStarts = eachYearOfInterval({ start: since, end: now });
    return yearStarts
      .map((ys) => ({
        type: SummaryType.YEARLY ,
        start: startOfYear(ys),
        end: endOfYear(ys),
      }))
      .filter((p) => isAfter(now, p.end));
  }
}
