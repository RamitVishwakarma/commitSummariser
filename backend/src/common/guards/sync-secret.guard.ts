import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

@Injectable()
export class SyncSecretGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const provided = request.headers['x-sync-secret'];
    const expected = this.configService.getOrThrow<string>('SYNC_SECRET');

    if (!provided || provided !== expected) {
      throw new UnauthorizedException('Invalid sync secret');
    }
    return true;
  }
}
