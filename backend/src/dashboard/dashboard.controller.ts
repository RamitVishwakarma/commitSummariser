import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';
import { DashboardService, type DashboardStats } from './dashboard.service';

@Controller('dashboard')
@UseGuards(AuthenticatedGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  getStats(): Promise<DashboardStats> {
    return this.dashboardService.getStats();
  }
}
