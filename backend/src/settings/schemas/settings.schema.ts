import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type SettingsDocument = HydratedDocument<Settings>;

@Schema({ timestamps: true })
export class Settings {
  @Prop({ default: '' })
  declare githubToken: string;

  @Prop({ default: '' })
  declare githubUserId: string;

  @Prop({ default: '' })
  declare githubUsername: string;

  @Prop({ type: [String], default: [] })
  declare trackedRepos: string[];

  @Prop({
    type: {
      provider: { type: String, default: 'mistral' },
      apiKey: { type: String, default: '' },
      model: { type: String, default: 'mistral-small-latest' },
      customPrompt: { type: String, default: '' },
    },
    default: () => ({
      provider: 'mistral',
      apiKey: '',
      model: 'mistral-small-latest',
      customPrompt: '',
    }),
  })
  declare llm: {
    provider: string;
    apiKey: string;
    model: string;
    customPrompt: string;
  };

  @Prop({ type: Date, default: null })
  declare lastSyncDate: Date | null;

  @Prop({ default: 'Sunday' })
  declare weeklySummaryDay: string;

  @Prop({ default: 1 })
  declare monthlySummaryDayOfMonth: number;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
