import { Controller, Get, Inject, Optional } from '@nestjs/common';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { StorageService } from './infrastructure/storage/storage.service';

@Controller('api')
export class AppController {
  constructor(
    @Optional() private readonly prisma?: PrismaService,
    @Optional()
    @Inject(StorageService)
    private readonly storage?: StorageService,
  ) {}

  @Get('health')
  async health(): Promise<{
    status: string;
    database: string;
    storage: string;
  }> {
    const [database, storage] = await Promise.all([
      this.databaseHealth(),
      this.storageHealth(),
    ]);

    return {
      status: database === 'ok' && storage === 'ok' ? 'ok' : 'degraded',
      database,
      storage,
    };
  }

  private async databaseHealth(): Promise<string> {
    if (!this.prisma) {
      return 'unknown';
    }

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return 'ok';
    } catch {
      return 'offline';
    }
  }

  private async storageHealth(): Promise<string> {
    if (!this.storage?.health) {
      return 'unknown';
    }

    try {
      await this.storage.health();
      return 'ok';
    } catch {
      return 'offline';
    }
  }
}
