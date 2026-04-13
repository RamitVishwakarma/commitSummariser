import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { SummaryType } from '../schemas/summary.schema';

export class QuerySummariesDto {
  @IsEnum(Object.values(SummaryType))
  @IsOptional()
  type?: SummaryType;

  @IsInt()
  @Min(2000)
  @Max(2100)
  @IsOptional()
  year?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20;
}
