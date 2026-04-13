import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { CommitsModule } from './commits/commits.module';
import { SummariesModule } from './summaries/summaries.module';
import { GithubModule } from './github/github.module';
import { LlmModule } from './llm/llm.module';
import { SyncModule } from './sync/sync.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ExportModule } from './export/export.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DatabaseModule,
    SettingsModule,
    AuthModule,
    RepositoriesModule,
    CommitsModule,
    SummariesModule,
    GithubModule,
    LlmModule,
    SyncModule,
    DashboardModule,
    ExportModule,
  ],
})
export class AppModule {}
