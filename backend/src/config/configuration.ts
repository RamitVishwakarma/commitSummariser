import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Max,
  Min,
  validateSync,
} from 'class-validator';

const NodeEnv = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

class EnvironmentVariables {
  @IsEnum(Object.values(NodeEnv))
  NODE_ENV: string = NodeEnv.DEVELOPMENT;

  @IsInt()
  @Min(1)
  @Max(65535)
  PORT: number = 3001;

  @IsString()
  @IsNotEmpty()
  MONGODB_URI: string = '';

  @IsString()
  @IsNotEmpty()
  GITHUB_CLIENT_ID: string = '';

  @IsString()
  @IsNotEmpty()
  GITHUB_CLIENT_SECRET: string = '';

  @IsUrl({ require_tld: false })
  GITHUB_CALLBACK_URL: string = '';

  @IsString()
  @IsNotEmpty()
  SESSION_SECRET: string = '';

  @IsString()
  @IsNotEmpty()
  SYNC_SECRET: string = '';

  @IsString()
  @IsNotEmpty()
  MISTRAL_API_KEY: string = '';

  @IsUrl({ require_tld: false })
  FRONTEND_URL: string = '';

  @IsString()
  @IsNotEmpty()
  MISTRAL_DEFAULT_MODEL: string = 'mistral-small-latest';
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.map((e) => e.toString()).join('\n')}`);
  }
  return validated;
}
