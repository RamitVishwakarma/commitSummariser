import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { SyncSecretGuard } from '../common/guards/sync-secret.guard';
import { SyncService, type SyncResult } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post()
  @UseGuards(SyncSecretGuard)
  @HttpCode(HttpStatus.OK)
  runSync(): Promise<SyncResult> {
    return this.syncService.runSync();
  }
}
