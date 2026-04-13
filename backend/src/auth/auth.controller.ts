import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import type { GithubUser } from './strategies/github.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubAuth(): void {
    // Passport redirects to GitHub — no body needed
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubCallback(@Res() res: Response): void {
    const frontendUrl = this.configService.getOrThrow<string>('FRONTEND_URL');
    res.redirect(`${frontendUrl}/dashboard`);
  }

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  me(@Req() req: Request): GithubUser {
    return req.user as GithubUser;
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request, @Res() res: Response): void {
    req.logout((err: Error | null) => {
      if (err) {
        res.status(500).json({ error: 'Logout failed' });
        return;
      }
      res.json({ ok: true });
    });
  }
}
