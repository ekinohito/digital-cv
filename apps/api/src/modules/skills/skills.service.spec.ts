import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { SkillsService } from './skills.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { SkillCategory } from './graphql/skill-category.enum';

describe('SkillsService', () => {
  let service: SkillsService;
  let prisma: {
    skill: {
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  const skillRow = {
    id: 'skill-1',
    slug: 'typescript',
    name: 'TypeScript',
    category: 'LANGUAGE',
    sortOrder: 10,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  beforeEach(() => {
    prisma = {
      skill: {
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };
    service = new SkillsService(prisma as unknown as PrismaService);
  });

  describe('findAll', () => {
    it('returns all skills without a category filter', async () => {
      prisma.skill.findMany.mockResolvedValue([skillRow]);

      const result = await service.findAll();

      expect(prisma.skill.findMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
      });
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 'skill-1',
        slug: 'typescript',
        category: SkillCategory.LANGUAGE,
      });
    });

    it('filters by category when provided', async () => {
      prisma.skill.findMany.mockResolvedValue([]);

      await service.findAll(SkillCategory.DATABASE);

      expect(prisma.skill.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { category: SkillCategory.DATABASE },
        }),
      );
    });
  });

  describe('create', () => {
    it('maps the created row to the GraphQL object', async () => {
      prisma.skill.create.mockResolvedValue(skillRow);

      const result = await service.create({
        slug: 'typescript',
        name: 'TypeScript',
        category: SkillCategory.LANGUAGE,
        sortOrder: 10,
      });

      expect(prisma.skill.create).toHaveBeenCalledWith({
        data: {
          slug: 'typescript',
          name: 'TypeScript',
          category: SkillCategory.LANGUAGE,
          sortOrder: 10,
        },
      });
      expect(result.category).toBe(SkillCategory.LANGUAGE);
    });

    it('maps a unique constraint violation to a conflict', async () => {
      prisma.skill.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
          code: 'P2002',
          clientVersion: 'test',
        }),
      );

      await expect(
        service.create({
          slug: 'typescript',
          name: 'TypeScript',
          category: SkillCategory.LANGUAGE,
          sortOrder: 10,
        }),
      ).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('update', () => {
    it('passes only provided fields to prisma', async () => {
      prisma.skill.update.mockResolvedValue(skillRow);

      await service.update('skill-1', { sortOrder: 42 });

      expect(prisma.skill.update).toHaveBeenCalledWith({
        where: { id: 'skill-1' },
        data: {
          slug: undefined,
          name: undefined,
          category: undefined,
          sortOrder: 42,
        },
      });
    });

    it('maps a missing record to a not found error', async () => {
      prisma.skill.update.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Record not found', {
          code: 'P2025',
          clientVersion: 'test',
        }),
      );

      await expect(
        service.update('missing', { name: 'x' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('delete', () => {
    it('returns true on success', async () => {
      prisma.skill.delete.mockResolvedValue(skillRow);

      await expect(service.delete('skill-1')).resolves.toBe(true);
    });

    it('maps a missing record to a not found error', async () => {
      prisma.skill.delete.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Record not found', {
          code: 'P2025',
          clientVersion: 'test',
        }),
      );

      await expect(service.delete('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
