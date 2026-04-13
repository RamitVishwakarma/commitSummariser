import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repository.dto';
import { RepositoriesService } from './repositories.service';
import type { RepositoryDocument } from './schemas/repository.schema';

@Controller('repositories')
@UseGuards(AuthenticatedGuard)
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  findAll(): Promise<RepositoryDocument[]> {
    return this.repositoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RepositoryDocument> {
    return this.repositoriesService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateRepositoryDto): Promise<RepositoryDocument> {
    return this.repositoriesService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRepositoryDto,
  ): Promise<RepositoryDocument> {
    return this.repositoriesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    await this.repositoriesService.remove(id);
    return { deleted: true };
  }
}
