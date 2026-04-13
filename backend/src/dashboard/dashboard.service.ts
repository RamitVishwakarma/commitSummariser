import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { startOfWeek, subWeeks } from 'date-fns';
import { Commit, type CommitDocument } from '../commits/schemas/commit.schema';
import { Repository, type RepositoryDocument } from '../repositories/schemas/repository.schema';
import { Summary, type SummaryDocument } from '../summaries/schemas/summary.schema';
import { SettingsService } from '../settings/settings.service';

export interface DashboardStats {
  reposTracked: number;
  commitsThisWeek: number;
  commitsLastWeek: number;
  summariesGenerated: number;
  lastSyncDate: Date | null;
}

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Commit.name) private readonly commitModel: Model<CommitDocument>,
    @InjectModel(Repository.name) private readonly repoModel: Model<RepositoryDocument>,
    @InjectModel(Summary.name) private readonly summaryModel: Model<SummaryDocument>,
    private readonly settingsService: SettingsService,
  ) {}

  async getStats(): Promise<DashboardStats> {
    const now = new Date();
    const thisWeekStart = startOfWeek(now, { weekStartsOn: 0 });
    const lastWeekStart = subWeeks(thisWeekStart, 1);

    const [reposTracked, commitsThisWeek, commitsLastWeek, summariesGenerated, settings] =
      await Promise.all([
        this.repoModel.countDocuments({ isActive: true }).exec(),
        this.commitModel
          .countDocuments({ committedAt: { $gte: thisWeekStart }, isDeleted: false })
          .exec(),
        this.commitModel
          .countDocuments({
            committedAt: { $gte: lastWeekStart, $lt: thisWeekStart },
            isDeleted: false,
          })
          .exec(),
        this.summaryModel.countDocuments().exec(),
        this.settingsService.getSettings(),
      ]);

    return {
      reposTracked,
      commitsThisWeek,
      commitsLastWeek,
      summariesGenerated,
      lastSyncDate: settings.lastSyncDate,
    };
  }
}
