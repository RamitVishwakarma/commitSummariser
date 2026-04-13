import { IsArray, IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';

export class PatchCommitDto {
  @IsBoolean()
  @IsOptional()
  isFlagged?: boolean;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}

export class BulkPatchCommitDto {
  @IsArray()
  @IsMongoId({ each: true })
  ids!: string[];

  @IsBoolean()
  @IsOptional()
  isFlagged?: boolean;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}

export class BulkDeleteCommitDto {
  @IsArray()
  @IsString({ each: true })
  ids!: string[];
}
