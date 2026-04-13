import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateRepositoryDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  description?: string;
}
