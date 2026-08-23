import { Skill } from '../../generated/prisma/client';
import { SkillObject } from './graphql/skill.object';
import { SkillCategory } from './graphql/skill-category.enum';

export function mapSkill(skill: Skill): SkillObject {
  return {
    id: skill.id,
    slug: skill.slug,
    name: skill.name,
    category: skill.category as SkillCategory,
    sortOrder: skill.sortOrder,
    createdAt: skill.createdAt,
    updatedAt: skill.updatedAt,
  };
}
