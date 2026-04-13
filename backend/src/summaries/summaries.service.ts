import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { Summary, SummaryType, type SummaryDocument } from './schemas/summary.schema';
import type { QuerySummariesDto } from './dto/query-summaries.dto';
import { paginate, type PaginatedResult } from '../common/types/paginated.type';

export interface CreateSummaryData {
  type: SummaryType;
  periodStart: Date;
  periodEnd: Date;
  content: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  modelUsed: string;
}

@Injectable()
export class SummariesService {
  constructor(
    @InjectModel(Summary.name)
    private readonly summaryModel: Model<SummaryDocument>,
  ) {}

  async findAll(query: QuerySummariesDto): Promise<PaginatedResult<SummaryDocument>> {
    const filter: Record<string, unknown> = {};
    if (query.type) filter['type'] = query.type;
    if (query.year) {
      filter['periodStart'] = {
        $gte: new Date(`${query.year}-01-01`),
        $lte: new Date(`${query.year}-12-31`),
      };
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      this.summaryModel.find(filter).sort({ periodStart: -1 }).skip(skip).limit(limit).exec(),
      this.summaryModel.countDocuments(filter).exec(),
    ]);

    return paginate(docs, total, page, limit);
  }

  async findLatest(type: SummaryType): Promise<SummaryDocument | null> {
    return this.summaryModel.findOne({ type }).sort({ periodStart: -1 }).exec();
  }

  async findById(id: string): Promise<SummaryDocument> {
    const doc = await this.summaryModel.findById(id).exec();
    if (!doc) throw new NotFoundException(`Summary ${id} not found`);
    return doc;
  }

  async create(data: CreateSummaryData): Promise<SummaryDocument> {
    return this.summaryModel.create({
      ...data,
      generatedAt: new Date(),
    });
  }

  async replace(id: string, data: CreateSummaryData): Promise<SummaryDocument> {
    const doc = await this.summaryModel
      .findByIdAndUpdate(
        id,
        { $set: { ...data, generatedAt: new Date() } },
        { new: true },
      )
      .exec();
    if (!doc) throw new NotFoundException(`Summary ${id} not found`);
    return doc;
  }

  async existsForPeriod(type: SummaryType, periodStart: Date, periodEnd: Date): Promise<boolean> {
    const count = await this.summaryModel.countDocuments({ type, periodStart, periodEnd }).exec();
    return count > 0;
  }

  async remove(id: string): Promise<void> {
    const result = await this.summaryModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Summary ${id} not found`);
  }
}
