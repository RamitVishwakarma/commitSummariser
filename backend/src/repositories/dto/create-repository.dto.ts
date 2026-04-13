import { IsString, Matches } from 'class-validator';

export class CreateRepositoryDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/, {
    message: 'fullName must be in "owner/repo" format',
  })
  fullName!: string;
}
