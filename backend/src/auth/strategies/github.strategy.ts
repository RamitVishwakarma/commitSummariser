import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { SettingsService } from '../../settings/settings.service';

export interface GithubUser {
  githubUserId: string;
  githubUsername: string;
}

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    configService: ConfigService,
    private readonly settingsService: SettingsService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GITHUB_CALLBACK_URL'),
      scope: ['repo', 'user:email'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: { id: string; username?: string },
  ): Promise<GithubUser> {
    await this.settingsService.upsertFromOAuth({
      githubToken: accessToken,
      githubUserId: profile.id,
      githubUsername: profile.username ?? '',
    });
    return {
      githubUserId: profile.id,
      githubUsername: profile.username ?? '',
    };
  }
}
