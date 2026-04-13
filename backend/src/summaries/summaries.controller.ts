import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { QuerySummariesDto } from './dto/query-summaries.dto';
import { SummaryType, type SummaryDocument } from './schemas/summary.schema';
import { SummariesService } from './summaries.service';
import type { PaginatedResult } from '../common/types/paginated.type';

@Controller('summaries')
@UseGuards(AuthenticatedGuard)
export class SummariesController {
  constructor(private readonly summariesService: SummariesService) {}

  @Get()
  findAll(@Query() query: QuerySummariesDto): Promise<PaginatedResult<SummaryDocument>> {
    return this.summariesService.findAll(query);
  }

  @Get('latest')
  async findLatest(@Query('type') type: string): Promise<SummaryDocument> {
    const validType = Object.values(SummaryType).find((t) => t === type);
    if (!validType) throw new NotFoundException('Invalid summary type');
    const summary = await this.summariesService.findLatest(validType);
    if (!summary) throw new NotFoundException('No summary found');
    return summary;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SummaryDocument> {
    return this.summariesService.findById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.summariesService.remove(id);
    return { deleted: true };
  }
}
