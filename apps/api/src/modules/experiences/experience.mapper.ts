import { Prisma } from '../../generated/prisma/client';
import { mapSkill } from '../skills/skill.mapper';
import { ExperienceObject } from './graphql/experience.object';

export type ExperienceWithSkills = Prisma.ExperienceGetPayload<{
  include: { skills: true };
}>;

export function mapExperience(
  experience: ExperienceWithSkills,
): ExperienceObject {
  return {
    id: experience.id,
    company: experience.company,
    roleEn: experience.roleEn,
    roleRu: experience.roleRu,
    descriptionEn: experience.descriptionEn,
    descriptionRu: experience.descriptionRu,
    startDate: experience.startDate,
    endDate: experience.endDate,
    sortOrder: experience.sortOrder,
    skills: experience.skills.map(mapSkill),
    createdAt: experience.createdAt,
    updatedAt: experience.updatedAt,
  };
}
