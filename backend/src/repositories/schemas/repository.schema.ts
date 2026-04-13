import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type RepositoryDocument = HydratedDocument<Repository>;

@Schema({ timestamps: true })
export class Repository {
  @Prop({ required: true })
  declare name: string;

  @Prop({ required: true, unique: true })
  declare fullName: string;

  @Prop({ default: '' })
  declare description: string;

  @Prop({ default: '' })
  declare language: string;

  @Prop({ required: true })
  declare githubUrl: string;

  @Prop({ default: true })
  declare isActive: boolean;

  @Prop({ type: Date, default: null })
  declare lastSynced: Date | null;

  @Prop({ default: 0 })
  declare totalCommits: number;
}

export const RepositorySchema = SchemaFactory.createForClass(Repository);
