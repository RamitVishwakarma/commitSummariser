import { Injectable } from '@nestjs/common';
import { CommitsService } from '../commits/commits.service';
import { SummariesService } from '../summaries/summaries.service';
import { SummaryType } from '../summaries/schemas/summary.schema';
import { SettingsService } from '../settings/settings.service';

export interface ExportQuery {
  month: string;
  year: number;
  format: 'json' | 'csv';
  includeLlmPrompt: boolean;
}

export interface ExportResult {
  filename: string;
  contentType: string;
  body: string;
}

const MONTH_NAMES: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

@Injectable()
export class ExportService {
  constructor(
    private readonly commitsService: CommitsService,
    private readonly summariesService: SummariesService,
    private readonly settingsService: SettingsService,
  ) {}

  async buildExport(query: ExportQuery): Promise<ExportResult> {
    const monthIndex = MONTH_NAMES[query.month.toLowerCase()];
    if (monthIndex === undefined) throw new Error(`Unknown month: ${query.month}`);

    const periodStart = new Date(query.year, monthIndex, 1);
    const periodEnd = new Date(query.year, monthIndex + 1, 0, 23, 59, 59, 999);

    const commits = await this.commitsService.getForPeriod(periodStart, periodEnd);
    const summary = await this.summariesService.findLatest(SummaryType.MONTHLY);

    const settings = await this.settingsService.getSettings();
    const llmPrompt = query.includeLlmPrompt ? settings.llm.customPrompt : undefined;

    const monthLabel = query.month.charAt(0).toUpperCase() + query.month.slice(1).toLowerCase();
    const baseFilename = `gitpulse-${monthLabel.toLowerCase()}-${query.year}`;

    if (query.format === 'csv') {
      const rows = [
        ['hash', 'repo', 'message', 'author', 'date', 'status'],
        ...commits.map((c) => [
          c.hash,
          c.repoName,
          `"${c.message.replace(/"/g, '""')}"`,
          c.author,
          c.committedAt.toISOString(),
          c.status,
        ]),
      ];
      const csv = rows.map((r) => r.join(',')).join('\n');

      return {
        filename: `${baseFilename}.csv`,
        contentType: 'text/csv',
        body: csv,
      };
    }

    const payload: Record<string, unknown> = {
      period: { month: monthLabel, year: query.year, start: periodStart, end: periodEnd },
      commits,
      summary: summary?.toObject() ?? null,
    };
    if (llmPrompt) payload['llmPrompt'] = llmPrompt;

    return {
      filename: `${baseFilename}.json`,
      contentType: 'application/json',
      body: JSON.stringify(payload, null, 2),
    };
  }
}
