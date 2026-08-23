import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AssetsService } from './assets.service';

describe('AssetsService', () => {
  let service: AssetsService;
  let storage: {
    bucket: string;
    put: jest.Mock;
    get: jest.Mock;
    delete: jest.Mock;
  };
  let prisma: {
    asset: {
      findMany: jest.Mock;
      findUnique: jest.Mock;
      create: jest.Mock;
      delete: jest.Mock;
    };
    profile: { findFirst: jest.Mock };
    project: { findFirst: jest.Mock };
  };

  const assetRow = {
    id: 'asset-1',
    bucket: 'portfolio',
    key: 'abc.txt',
    originalName: 'notes.txt',
    mimeType: 'text/plain',
    size: 5,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  beforeEach(() => {
    storage = {
      bucket: 'portfolio',
      put: jest.fn().mockResolvedValue(undefined),
      get: jest.fn(),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    prisma = {
      asset: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
      },
      profile: { findFirst: jest.fn() },
      project: { findFirst: jest.fn() },
    };
    service = new AssetsService(prisma as unknown as PrismaService, storage);
  });

  describe('create', () => {
    it('stores the object and records its metadata', async () => {
      prisma.asset.create.mockResolvedValue(assetRow);

      const result = await service.create({
        originalName: 'notes.txt',
        mimeType: 'text/plain',
        data: Buffer.from('hello'),
      });

      expect(storage.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Buffer),
        'text/plain',
      );
      expect(prisma.asset.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            bucket: 'portfolio',
            originalName: 'notes.txt',
            mimeType: 'text/plain',
            size: 5,
          }),
        }),
      );
      expect(result).toMatchObject({
        id: 'asset-1',
        url: '/api/assets/asset-1',
      });
    });

    it('rejects unsupported media types', async () => {
      await expect(
        service.create({
          originalName: 'app.exe',
          mimeType: 'application/octet-stream',
          data: Buffer.from('MZ'),
        }),
      ).rejects.toBeInstanceOf(UnsupportedMediaTypeException);
      expect(storage.put).not.toHaveBeenCalled();
    });

    it('rejects empty files', async () => {
      await expect(
        service.create({
          originalName: 'empty.txt',
          mimeType: 'text/plain',
          data: Buffer.alloc(0),
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('removes the stored object when the metadata insert fails', async () => {
      prisma.asset.create.mockRejectedValue(new Error('insert failed'));

      await expect(
        service.create({
          originalName: 'notes.txt',
          mimeType: 'text/plain',
          data: Buffer.from('hello'),
        }),
      ).rejects.toThrow('insert failed');
      expect(storage.delete).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe('getObject', () => {
    it('streams the stored object', async () => {
      prisma.asset.findUnique.mockResolvedValue(assetRow);
      const stream = {} as never;
      storage.get.mockResolvedValue(stream);
      const result = await service.getObject('asset-1');

      expect(storage.get).toHaveBeenCalledWith('abc.txt');
      expect(result.asset.mimeType).toBe('text/plain');
      expect(result.stream).toBe(stream);
    });

    it('throws not found for an unknown asset', async () => {
      prisma.asset.findUnique.mockResolvedValue(null);

      await expect(service.getObject('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('deletes the row and the stored object', async () => {
      prisma.asset.findUnique.mockResolvedValue(assetRow);
      prisma.profile.findFirst.mockResolvedValue(null);
      prisma.project.findFirst.mockResolvedValue(null);

      await expect(service.delete('asset-1')).resolves.toBe(true);

      expect(prisma.asset.delete).toHaveBeenCalledWith({
        where: { id: 'asset-1' },
      });
      expect(storage.delete).toHaveBeenCalledWith('abc.txt');
    });

    it('refuses to delete an asset referenced by the profile', async () => {
      prisma.asset.findUnique.mockResolvedValue(assetRow);
      prisma.profile.findFirst
        .mockResolvedValueOnce({ id: 'profile-1' })
        .mockResolvedValueOnce(null);
      prisma.project.findFirst.mockResolvedValue(null);

      await expect(service.delete('asset-1')).rejects.toBeInstanceOf(
        ConflictException,
      );
      expect(prisma.asset.delete).not.toHaveBeenCalled();
    });

    it('refuses to delete an asset referenced by a project', async () => {
      prisma.asset.findUnique.mockResolvedValue(assetRow);
      prisma.profile.findFirst.mockResolvedValue(null);
      prisma.project.findFirst.mockResolvedValue({ id: 'project-1' });

      await expect(service.delete('asset-1')).rejects.toBeInstanceOf(
        ConflictException,
      );
    });

    it('throws not found for an unknown asset', async () => {
      prisma.asset.findUnique.mockResolvedValue(null);

      await expect(service.delete('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
