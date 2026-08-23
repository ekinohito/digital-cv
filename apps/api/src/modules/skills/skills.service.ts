import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { mapPrismaKnownErrors } from '../../common/prisma-error.mapper';
import { SkillCategory } from './graphql/skill-category.enum';
import { CreateSkillInput } from './graphql/create-skill.input';
import { UpdateSkillInput } from './graphql/update-skill.input';
import { mapSkill } from './skill.mapper';
import { SkillObject } from './graphql/skill.object';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(category?: SkillCategory): Promise<SkillObject[]> {
    const skills = await this.prisma.skill.findMany({
      where: category === undefined ? undefined : { category },
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    });
    return skills.map(mapSkill);
  }

  async create(input: CreateSkillInput): Promise<SkillObject> {
    try {
      const skill = await this.prisma.skill.create({
        data: {
          slug: input.slug,
          name: input.name,
          category: input.category,
          sortOrder: input.sortOrder,
        },
      });
      return mapSkill(skill);
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'Skill');
    }
  }

  async update(id: string, input: UpdateSkillInput): Promise<SkillObject> {
    try {
      const skill = await this.prisma.skill.update({
        where: { id },
        data: {
          slug: input.slug,
          name: input.name,
          category: input.category,
          sortOrder: input.sortOrder,
        },
      });
      return mapSkill(skill);
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'Skill');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.skill.delete({ where: { id } });
      return true;
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'Skill');
    }
  }
}
