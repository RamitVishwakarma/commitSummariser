import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
@UseGuards(AuthenticatedGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(): Promise<Record<string, unknown>> {
    return this.settingsService.getSettingsMasked();
  }

  @Patch()
  async updateSettings(
    @Body() dto: UpdateSettingsDto,
  ): Promise<Record<string, unknown>> {
    await this.settingsService.update(dto);
    return this.settingsService.getSettingsMasked();
  }

  @Post('test-connection')
  @HttpCode(HttpStatus.OK)
  async testConnection(): Promise<{ ok: boolean; login: string }> {
    const settings = await this.settingsService.getRawSettings();
    const token = settings.githubToken;
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'GitPulse/1.0',
      },
    });
    if (!response.ok) {
      return { ok: false, login: '' };
    }
    const data = (await response.json()) as { login: string };
    return { ok: true, login: data.login };
  }
}
