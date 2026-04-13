import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { Repository, type RepositoryDocument } from './schemas/repository.schema';
import type { CreateRepositoryDto } from './dto/create-repository.dto';
import type { UpdateRepositoryDto } from './dto/update-repository.dto';

@Injectable()
export class RepositoriesService {
  constructor(
    @InjectModel(Repository.name)
    private readonly repoModel: Model<RepositoryDocument>,
  ) {}

  async findAll(): Promise<RepositoryDocument[]> {
    return this.repoModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<RepositoryDocument> {
    const repo = await this.repoModel.findById(id).exec();
    if (!repo) throw new NotFoundException(`Repository ${id} not found`);
    return repo;
  }

  async findByFullName(fullName: string): Promise<RepositoryDocument | null> {
    return this.repoModel.findOne({ fullName }).exec();
  }

  async create(dto: CreateRepositoryDto): Promise<RepositoryDocument> {
    const [owner, repoName] = dto.fullName.split('/');
    return this.repoModel.create({
      name: repoName,
      fullName: dto.fullName,
      githubUrl: `https://github.com/${dto.fullName}`,
    });
  }

  async update(id: string, dto: UpdateRepositoryDto): Promise<RepositoryDocument> {
    const repo = await this.repoModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
    if (!repo) throw new NotFoundException(`Repository ${id} not found`);
    return repo;
  }

  async remove(id: string): Promise<void> {
    const result = await this.repoModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Repository ${id} not found`);
  }

  async incrementCommitCount(repoId: string, count: number): Promise<void> {
    await this.repoModel.findByIdAndUpdate(repoId, {
      $inc: { totalCommits: count },
      $set: { lastSynced: new Date() },
    });
  }

  async setCommitCount(repoId: string, total: number): Promise<void> {
    await this.repoModel.findByIdAndUpdate(repoId, {
      $set: { totalCommits: total, lastSynced: new Date() },
    });
  }
}
