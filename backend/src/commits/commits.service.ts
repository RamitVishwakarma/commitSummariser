import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import type { Model } from 'mongoose';
import { Commit, CommitStatus, type CommitDocument } from './schemas/commit.schema';
import type { QueryCommitsDto } from './dto/query-commits.dto';
import type { BulkPatchCommitDto, PatchCommitDto } from './dto/patch-commit.dto';
import { paginate, type PaginatedResult } from '../common/types/paginated.type';

export interface NewCommitData {
  repoId: string;
  repoName: string;
  hash: string;
  message: string;
  author: string;
  committedAt: Date;
  githubUrl: string;
}

export interface CommitView {
  id: string;
  repoId: string;
  repoName: string;
  hash: string;
  message: string;
  author: string;
  committedAt: Date;
  githubUrl: string;
  isFlagged: boolean;
  isDeleted: boolean;
  status: CommitStatus;
}

function toView(doc: CommitDocument): CommitView {
  let status: CommitStatus = CommitStatus.CLEAN;
  if (doc.isDeleted) status = CommitStatus.DELETED;
  else if (doc.isFlagged) status = CommitStatus.FLAGGED;

  return {
    id: doc._id.toString(),
    repoId: doc.repoId.toString(),
    repoName: doc.repoName,
    hash: doc.hash,
    message: doc.message,
    author: doc.author,
    committedAt: doc.committedAt,
    githubUrl: doc.githubUrl,
    isFlagged: doc.isFlagged,
    isDeleted: doc.isDeleted,
    status,
  };
}

@Injectable()
export class CommitsService {
  constructor(
    @InjectModel(Commit.name)
    private readonly commitModel: Model<CommitDocument>,
  ) {}

  async findAll(query: QueryCommitsDto): Promise<PaginatedResult<CommitView>> {
    const filter: Record<string, unknown> = {};
    if (query.repoId) filter['repoId'] = new Types.ObjectId(query.repoId);
    if (query.dateFrom || query.dateTo) {
      const dateFilter: Record<string, Date> = {};
      if (query.dateFrom) dateFilter['$gte'] = new Date(query.dateFrom);
      if (query.dateTo) dateFilter['$lte'] = new Date(query.dateTo);
      filter['committedAt'] = dateFilter;
    }
    if (query.status === CommitStatus.CLEAN) {
      filter['isFlagged'] = false;
      filter['isDeleted'] = false;
    } else if (query.status === CommitStatus.FLAGGED) {
      filter['isFlagged'] = true;
      filter['isDeleted'] = false;
    } else if (query.status === CommitStatus.DELETED) {
      filter['isDeleted'] = true;
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      this.commitModel.find(filter).sort({ committedAt: -1 }).skip(skip).limit(limit).exec(),
      this.commitModel.countDocuments(filter).exec(),
    ]);

    return paginate(docs.map(toView), total, page, limit);
  }

  async findToday(): Promise<CommitView[]> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const docs = await this.commitModel
      .find({ committedAt: { $gte: startOfDay, $lte: endOfDay } })
      .sort({ committedAt: -1 })
      .exec();

    return docs.map(toView);
  }

  async findById(id: string): Promise<CommitView> {
    const doc = await this.commitModel.findById(id).exec();
    if (!doc) throw new NotFoundException(`Commit ${id} not found`);
    return toView(doc);
  }

  async patch(id: string, dto: PatchCommitDto): Promise<CommitView> {
    const doc = await this.commitModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
    if (!doc) throw new NotFoundException(`Commit ${id} not found`);
    return toView(doc);
  }

  async bulkPatch(dto: BulkPatchCommitDto): Promise<{ updated: number }> {
    const update: Partial<Pick<Commit, 'isFlagged' | 'isDeleted'>> = {};
    if (dto.isFlagged !== undefined) update.isFlagged = dto.isFlagged;
    if (dto.isDeleted !== undefined) update.isDeleted = dto.isDeleted;

    const result = await this.commitModel.updateMany(
      { _id: { $in: dto.ids.map((id) => new Types.ObjectId(id)) } },
      { $set: update },
    );
    return { updated: result.modifiedCount };
  }

  async remove(id: string): Promise<void> {
    const result = await this.commitModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Commit ${id} not found`);
  }

  async bulkUpsert(commits: NewCommitData[]): Promise<number> {
    if (commits.length === 0) return 0;

    const ops = commits.map((c) => ({
      updateOne: {
        filter: { hash: c.hash, repoId: new Types.ObjectId(c.repoId) },
        update: {
          $setOnInsert: {
            repoId: new Types.ObjectId(c.repoId),
            repoName: c.repoName,
            hash: c.hash,
            message: c.message,
            author: c.author,
            committedAt: c.committedAt,
            githubUrl: c.githubUrl,
            isFlagged: false,
            isDeleted: false,
          },
        },
        upsert: true,
      },
    }));

    const result = await this.commitModel.bulkWrite(ops, { ordered: false });
    return result.upsertedCount;
  }

  async getForPeriod(periodStart: Date, periodEnd: Date): Promise<CommitView[]> {
    const docs = await this.commitModel
      .find({
        committedAt: { $gte: periodStart, $lte: periodEnd },
        isDeleted: false,
      })
      .sort({ committedAt: -1 })
      .exec();
    return docs.map(toView);
  }

  async countForPeriod(periodStart: Date, periodEnd: Date): Promise<number> {
    return this.commitModel.countDocuments({
      committedAt: { $gte: periodStart, $lte: periodEnd },
      isDeleted: false,
    });
  }
}
