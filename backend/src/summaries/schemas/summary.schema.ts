import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export const SummaryType = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

export type SummaryType = (typeof SummaryType)[keyof typeof SummaryType];

@Schema({ timestamps: true })
export class Summary {
  @Prop({ required: true, enum: Object.values(SummaryType) })
  declare type: SummaryType;

  @Prop({ required: true, type: Date })
  declare periodStart: Date;

  @Prop({ required: true, type: Date })
  declare periodEnd: Date;

  @Prop({ required: true, type: Object })
  declare content: Record<string, unknown>;

  @Prop({ type: Object, default: {} })
  declare metadata: Record<string, unknown>;

  @Prop({ required: true })
  declare modelUsed: string;

  @Prop({ required: true, type: Date })
  declare generatedAt: Date;
}

export type SummaryDocument = HydratedDocument<Summary>;

export const SummarySchema = SchemaFactory.createForClass(Summary);

SummarySchema.index({ type: 1, periodStart: -1 });
SummarySchema.index({ type: 1, periodStart: 1, periodEnd: 1 }, { unique: true });
