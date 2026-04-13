import {
  IsArray,
  IsDateString,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class LlmConfigDto {
  @IsString()
  @IsOptional()
  provider?: string;

  @IsString()
  @IsOptional()
  apiKey?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  customPrompt?: string;
}

export class UpdateSettingsDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  trackedRepos?: string[];

  @IsObject()
  @IsOptional()
  llm?: LlmConfigDto;

  @IsString()
  @IsOptional()
  weeklySummaryDay?: string;

  @IsInt()
  @Min(1)
  @Max(28)
  @IsOptional()
  monthlySummaryDayOfMonth?: number;

  @IsDateString()
  @IsOptional()
  lastSyncDate?: string;
}
