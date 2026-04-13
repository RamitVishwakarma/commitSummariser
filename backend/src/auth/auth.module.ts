import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SettingsModule } from '../settings/settings.module';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './strategies/github.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    SettingsModule,
  ],
  controllers: [AuthController],
  providers: [GithubStrategy, SessionSerializer],
})
export class AuthModule {}
