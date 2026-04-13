import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, type HydratedDocument } from 'mongoose';

export type CommitDocument = HydratedDocument<Commit>;

export const CommitStatus = {
  CLEAN: 'clean',
  FLAGGED: 'flagged',
  DELETED: 'deleted',
} as const;

export type CommitStatus = (typeof CommitStatus)[keyof typeof CommitStatus];

@Schema({ timestamps: true })
export class Commit {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Repository' })
  declare repoId: Types.ObjectId;

  @Prop({ required: true })
  declare repoName: string;

  @Prop({ required: true })
  declare hash: string;

  @Prop({ required: true })
  declare message: string;

  @Prop({ required: true })
  declare author: string;

  @Prop({ required: true, type: Date })
  declare committedAt: Date;

  @Prop({ required: true })
  declare githubUrl: string;

  @Prop({ default: false })
  declare isFlagged: boolean;

  @Prop({ default: false })
  declare isDeleted: boolean;
}

export const CommitSchema = SchemaFactory.createForClass(Commit);

CommitSchema.index({ hash: 1, repoId: 1 }, { unique: true });
CommitSchema.index({ repoId: 1, committedAt: -1 });
CommitSchema.index({ committedAt: -1 });
