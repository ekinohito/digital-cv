import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { mapPrismaKnownErrors } from '../../common/prisma-error.mapper';
import { CreateExperienceInput } from './graphql/create-experience.input';
import { UpdateExperienceInput } from './graphql/update-experience.input';
import { ExperienceObject } from './graphql/experience.object';
import { mapExperience } from './experience.mapper';

@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ExperienceObject[]> {
    const experiences = await this.prisma.experience.findMany({
      include: { skills: true },
      orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
    });
    return experiences.map(mapExperience);
  }

  async create(input: CreateExperienceInput): Promise<ExperienceObject> {
    await this.assertSkillsExist(input.skillIds);

    try {
      const experience = await this.prisma.experience.create({
        data: {
          company: input.company,
          roleEn: input.roleEn,
          roleRu: input.roleRu,
          descriptionEn: input.descriptionEn,
          descriptionRu: input.descriptionRu,
          startDate: input.startDate,
          endDate: input.endDate ?? null,
          sortOrder: input.sortOrder,
          skills: { connect: input.skillIds.map((id) => ({ id })) },
        },
        include: { skills: true },
      });
      return mapExperience(experience);
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'Experience');
    }
  }

  async update(
    id: string,
    input: UpdateExperienceInput,
  ): Promise<ExperienceObject> {
    if (input.skillIds !== undefined && input.skillIds !== null) {
      await this.assertSkillsExist(input.skillIds);
    }

    try {
      const experience = await this.prisma.experience.update({
        where: { id },
        data: {
          company: input.company,
          roleEn: input.roleEn,
          roleRu: input.roleRu,
          descriptionEn: input.descriptionEn,
          descriptionRu: input.descriptionRu,
          startDate: input.startDate,
          endDate: input.endDate,
          sortOrder: input.sortOrder,
          ...(input.skillIds !== undefined && input.skillIds !== null
            ? {
                skills: {
                  set: input.skillIds.map((skillId) => ({ id: skillId })),
                },
              }
            : {}),
        },
        include: { skills: true },
      });
      return mapExperience(experience);
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'Experience');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.experience.delete({ where: { id } });
      return true;
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'Experience');
    }
  }

  private async assertSkillsExist(ids: string[]): Promise<void> {
    if (ids.length === 0) {
      return;
    }
    const count = await this.prisma.skill.count({
      where: { id: { in: ids } },
    });
    if (count !== new Set(ids).size) {
      throw new BadRequestException('One or more skillIds do not exist');
    }
  }
}
