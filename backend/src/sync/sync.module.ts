import { Module } from '@nestjs/common';
import { CommitsModule } from '../commits/commits.module';
import { GithubModule } from '../github/github.module';
import { LlmModule } from '../llm/llm.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { SettingsModule } from '../settings/settings.module';
import { SummariesModule } from '../summaries/summaries.module';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';

@Module({
  imports: [
    SettingsModule,
    GithubModule,
    CommitsModule,
    RepositoriesModule,
    SummariesModule,
    LlmModule,
  ],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
