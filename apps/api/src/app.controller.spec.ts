import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { StorageService } from './infrastructure/storage/storage.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
          },
        },
        {
          provide: StorageService,
          useValue: { health: jest.fn().mockResolvedValue(undefined) },
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  describe('health', () => {
    it('returns dependency statuses', async () => {
      await expect(appController.health()).resolves.toEqual({
        status: 'ok',
        database: 'ok',
        storage: 'ok',
      });
    });
  });
});
