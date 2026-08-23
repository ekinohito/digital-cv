import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { ExperiencesService } from './experiences.service';

describe('ExperiencesService', () => {
  let service: ExperiencesService;
  let prisma: {
    experience: {
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
    skill: { count: jest.Mock };
  };

  const experienceRow = {
    id: 'experience-1',
    company: 'Example Labs',
    roleEn: 'Senior Backend Developer',
    roleRu: 'Старший backend-разработчик',
    descriptionEn: 'Did things',
    descriptionRu: 'Делал вещи',
    startDate: new Date('2023-04-01T00:00:00.000Z'),
    endDate: null,
    sortOrder: 10,
    skills: [
      {
        id: 'skill-1',
        slug: 'nestjs',
        name: 'NestJS',
        category: 'BACKEND',
        sortOrder: 1,
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
        updatedAt: new Date('2026-01-01T00:00:00.000Z'),
      },
    ],
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  beforeEach(() => {
    prisma = {
      experience: {
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      skill: { count: jest.fn() },
    };
    service = new ExperiencesService(prisma as unknown as PrismaService);
  });

  describe('findAll', () => {
    it('includes skills and maps rows', async () => {
      prisma.experience.findMany.mockResolvedValue([experienceRow]);

      const result = await service.findAll();

      expect(prisma.experience.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ include: { skills: true } }),
      );
      expect(result[0]).toMatchObject({
        id: 'experience-1',
        company: 'Example Labs',
        endDate: null,
        skills: [{ slug: 'nestjs' }],
      });
    });
  });

  describe('create', () => {
    it('rejects unknown skill ids before touching the database', async () => {
      prisma.skill.count.mockResolvedValue(0);

      await expect(
        service.create({
          company: 'Example Labs',
          roleEn: 'Dev',
          roleRu: 'Разработчик',
          descriptionEn: 'd',
          descriptionRu: 'о',
          startDate: new Date('2023-04-01T00:00:00.000Z'),
          sortOrder: 10,
          skillIds: ['missing-skill'],
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(prisma.experience.create).not.toHaveBeenCalled();
    });

    it('connects skills and maps the created row', async () => {
      prisma.skill.count.mockResolvedValue(1);
      prisma.experience.create.mockResolvedValue(experienceRow);

      const result = await service.create({
        company: 'Example Labs',
        roleEn: 'Senior Backend Developer',
        roleRu: 'Старший backend-разработчик',
        descriptionEn: 'Did things',
        descriptionRu: 'Делал вещи',
        startDate: new Date('2023-04-01T00:00:00.000Z'),
        sortOrder: 10,
        skillIds: ['skill-1'],
      });

      expect(prisma.experience.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            skills: { connect: [{ id: 'skill-1' }] },
          }),
        }),
      );
      expect(result.skills).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('replaces the skill set when skillIds is provided', async () => {
      prisma.skill.count.mockResolvedValue(1);
      prisma.experience.update.mockResolvedValue(experienceRow);

      await service.update('experience-1', { skillIds: ['skill-1'] });

      expect(prisma.experience.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            skills: { set: [{ id: 'skill-1' }] },
          }),
        }),
      );
    });

    it('keeps the skill set untouched when skillIds is omitted', async () => {
      prisma.experience.update.mockResolvedValue(experienceRow);

      await service.update('experience-1', { sortOrder: 20 });

      const data = prisma.experience.update.mock.calls[0][0].data;
      expect(data).not.toHaveProperty('skills');
    });
  });
});
