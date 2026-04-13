import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Commit, CommitSchema } from '../commits/schemas/commit.schema';
import { Repository, RepositorySchema } from '../repositories/schemas/repository.schema';
import { Summary, SummarySchema } from '../summaries/schemas/summary.schema';
import { SettingsModule } from '../settings/settings.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Commit.name, schema: CommitSchema },
      { name: Repository.name, schema: RepositorySchema },
      { name: Summary.name, schema: SummarySchema },
    ]),
    SettingsModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
