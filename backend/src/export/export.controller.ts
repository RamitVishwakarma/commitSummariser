import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { IsBoolean, IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { ExportService } from './export.service';

class ExportQueryDto {
  @IsString()
  month!: string;

  @IsInt()
  @Min(2000)
  @Max(2100)
  year!: number;

  @IsEnum(['json', 'csv'])
  format: 'json' | 'csv' = 'json';

  @IsBoolean()
  includeLlmPrompt: boolean = false;
}

@Controller('export')
@UseGuards(AuthenticatedGuard)
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get()
  async export(
    @Query() query: ExportQueryDto,
    @Res() res: Response,
  ): Promise<void> {
    if (!query.month || !query.year) {
      throw new BadRequestException('month and year are required');
    }

    const result = await this.exportService.buildExport({
      month: query.month,
      year: query.year,
      format: query.format,
      includeLlmPrompt: query.includeLlmPrompt,
    });

    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    res.setHeader('Content-Type', result.contentType);
    res.send(result.body);
  }
}
