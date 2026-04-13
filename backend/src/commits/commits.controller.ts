import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { CommitsService, type CommitView } from './commits.service';
import { BulkPatchCommitDto, PatchCommitDto } from './dto/patch-commit.dto';
import { QueryCommitsDto } from './dto/query-commits.dto';
import type { PaginatedResult } from '../common/types/paginated.type';

@Controller('commits')
@UseGuards(AuthenticatedGuard)
export class CommitsController {
  constructor(private readonly commitsService: CommitsService) {}

  @Get()
  findAll(@Query() query: QueryCommitsDto): Promise<PaginatedResult<CommitView>> {
    return this.commitsService.findAll(query);
  }

  @Get('today')
  findToday(): Promise<CommitView[]> {
    return this.commitsService.findToday();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CommitView> {
    return this.commitsService.findById(id);
  }

  @Patch('bulk')
  @HttpCode(HttpStatus.OK)
  bulkPatch(@Body() dto: BulkPatchCommitDto): Promise<{ updated: number }> {
    return this.commitsService.bulkPatch(dto);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: PatchCommitDto): Promise<CommitView> {
    return this.commitsService.patch(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.commitsService.remove(id);
    return { deleted: true };
  }
}
