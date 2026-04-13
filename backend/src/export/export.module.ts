import { Module } from '@nestjs/common';
import { CommitsModule } from '../commits/commits.module';
import { SettingsModule } from '../settings/settings.module';
import { SummariesModule } from '../summaries/summaries.module';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';

@Module({
  imports: [CommitsModule, SummariesModule, SettingsModule],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}
