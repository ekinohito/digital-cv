import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prisma: {
    project: {
      findMany: jest.Mock;
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
    skill: { count: jest.Mock };
    asset: { findUnique: jest.Mock };
  };

  const skillRow = {
    id: 'skill-1',
    slug: 'nestjs',
    name: 'NestJS',
    category: 'BACKEND',
    sortOrder: 1,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  const projectRow = {
    id: 'project-1',
    slug: 'digital-cv',
    titleEn: 'Digital CV',
    titleRu: 'Цифровое CV',
    summaryEn: 'Portfolio',
    summaryRu: 'Портфолио',
    detailsEn: null,
    detailsRu: null,
    repoUrl: 'https://github.com/example/digital-cv',
    liveUrl: null,
    featured: true,
    sortOrder: 1,
    imageAssetId: 'asset-1',
    imageAsset: {
      id: 'asset-1',
      bucket: 'portfolio',
      key: 'abc.png',
      originalName: 'cover.png',
      mimeType: 'image/png',
      size: 1234,
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
    },
    skills: [skillRow],
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  beforeEach(() => {
    prisma = {
      project: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      skill: { count: jest.fn() },
      asset: { findUnique: jest.fn() },
    };
    service = new ProjectsService(prisma as unknown as PrismaService);
  });

  describe('findAll', () => {
    it('returns mapped projects with image and skills', async () => {
      prisma.project.findMany.mockResolvedValue([projectRow]);

      const result = await service.findAll();

      expect(prisma.project.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: undefined }),
      );
      expect(result[0]).toMatchObject({
        id: 'project-1',
        image: { id: 'asset-1', url: '/api/assets/asset-1' },
        skills: [{ slug: 'nestjs' }],
      });
    });

    it('filters featured projects', async () => {
      prisma.project.findMany.mockResolvedValue([]);

      await service.findAll(true);

      expect(prisma.project.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { featured: true } }),
      );
    });
  });

  describe('findBySlug', () => {
    it('returns null for an unknown slug', async () => {
      prisma.project.findUnique.mockResolvedValue(null);

      await expect(service.findBySlug('unknown')).resolves.toBeNull();
    });
  });

  describe('create', () => {
    it('rejects unknown skill ids', async () => {
      prisma.skill.count.mockResolvedValue(0);

      await expect(
        service.create({
          slug: 'new-project',
          titleEn: 'T',
          titleRu: 'Т',
          summaryEn: 'S',
          summaryRu: 'С',
          sortOrder: 1,
          featured: false,
          skillIds: ['missing-skill'],
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('rejects an unknown image asset id', async () => {
      prisma.skill.count.mockResolvedValue(0);
      prisma.asset.findUnique.mockResolvedValue(null);

      await expect(
        service.create({
          slug: 'new-project',
          titleEn: 'T',
          titleRu: 'Т',
          summaryEn: 'S',
          summaryRu: 'С',
          sortOrder: 1,
          featured: false,
          skillIds: [],
          imageAssetId: 'missing-asset',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('connects skills and maps the created row', async () => {
      prisma.skill.count.mockResolvedValue(1);
      prisma.asset.findUnique.mockResolvedValue({ id: 'asset-1' });
      prisma.project.create.mockResolvedValue(projectRow);

      const result = await service.create({
        slug: 'digital-cv',
        titleEn: 'Digital CV',
        titleRu: 'Цифровое CV',
        summaryEn: 'Portfolio',
        summaryRu: 'Портфолио',
        sortOrder: 1,
        featured: true,
        repoUrl: 'https://github.com/example/digital-cv',
        skillIds: ['skill-1'],
        imageAssetId: 'asset-1',
      });

      expect(prisma.project.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            imageAsset: { connect: { id: 'asset-1' } },
            skills: { connect: [{ id: 'skill-1' }] },
          }),
        }),
      );
      expect(result.image?.url).toBe('/api/assets/asset-1');
    });
  });

  describe('update', () => {
    it('disconnects the image when imageAssetId is null', async () => {
      prisma.project.update.mockResolvedValue({
        ...projectRow,
        imageAsset: null,
        imageAssetId: null,
      });

      const result = await service.update('project-1', { imageAssetId: null });

      expect(prisma.project.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ imageAsset: { disconnect: true } }),
        }),
      );
      expect(result.image).toBeNull();
    });

    it('replaces the skill set when skillIds is provided', async () => {
      prisma.skill.count.mockResolvedValue(1);
      prisma.project.update.mockResolvedValue(projectRow);

      await service.update('project-1', { skillIds: ['skill-1'] });

      expect(prisma.project.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            skills: { set: [{ id: 'skill-1' }] },
          }),
        }),
      );
    });

    it('maps a missing record to a not found error', async () => {
      prisma.project.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Record not found', {
          code: 'P2025',
          clientVersion: 'test',
        }),
      );

      await expect(
        service.update('missing', { titleEn: 'x' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('delete', () => {
    it('returns true on success', async () => {
      prisma.project.delete.mockResolvedValue(projectRow);

      await expect(service.delete('project-1')).resolves.toBe(true);
    });
  });
});
