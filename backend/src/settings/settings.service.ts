import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { Settings, type SettingsDocument } from './schemas/settings.schema';
import type { UpdateSettingsDto } from './dto/update-settings.dto';

export interface OAuthSettingsPayload {
  githubToken: string;
  githubUserId: string;
  githubUsername: string;
}

const TOKEN_MASK_VISIBLE = 4;

function maskToken(token: string): string {
  if (token.length <= TOKEN_MASK_VISIBLE * 2) return '●●●●●●●●';
  const start = token.slice(0, TOKEN_MASK_VISIBLE);
  const end = token.slice(-TOKEN_MASK_VISIBLE);
  return `${start}${'●'.repeat(8)}${end}`;
}

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(
    @InjectModel(Settings.name) private readonly settingsModel: Model<SettingsDocument>,
  ) {}

  async onModuleInit(): Promise<void> {
    const existing = await this.settingsModel.findOne({}).lean().exec();
    if (!existing) {
      await this.settingsModel.create({});
    }
  }

  async getSettings(): Promise<SettingsDocument> {
    const settings = await this.settingsModel.findOne({}).exec();
    if (!settings) {
      return this.settingsModel.create({});
    }
    return settings;
  }

  async getRawSettings(): Promise<SettingsDocument> {
    return this.getSettings();
  }

  async getSettingsMasked(): Promise<Record<string, unknown>> {
    const settings = await this.getSettings();
    const obj = settings.toObject();
    return {
      ...obj,
      githubToken: maskToken(obj.githubToken as string),
      llm: {
        ...(obj.llm as Record<string, unknown>),
        apiKey: maskToken((obj.llm as { apiKey: string }).apiKey),
      },
    };
  }

  async update(dto: UpdateSettingsDto | Partial<Settings>): Promise<SettingsDocument> {
    const settings = await this.getSettings();
    Object.assign(settings, dto);
    return settings.save();
  }

  async upsertFromOAuth(payload: OAuthSettingsPayload): Promise<void> {
    await this.settingsModel.findOneAndUpdate(
      {},
      {
        $set: {
          githubToken: payload.githubToken,
          githubUserId: payload.githubUserId,
          githubUsername: payload.githubUsername,
        },
      },
      { upsert: true },
    );
  }
}
