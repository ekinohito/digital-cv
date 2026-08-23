import { Prisma } from '../../generated/prisma/client';
import { mapAsset } from '../assets/asset.mapper';
import { mapSkill } from '../skills/skill.mapper';
import { ProjectObject } from './graphql/project.object';

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: { skills: true; imageAsset: true };
}>;

export function mapProject(project: ProjectWithRelations): ProjectObject {
  return {
    id: project.id,
    slug: project.slug,
    titleEn: project.titleEn,
    titleRu: project.titleRu,
    summaryEn: project.summaryEn,
    summaryRu: project.summaryRu,
    detailsEn: project.detailsEn,
    detailsRu: project.detailsRu,
    repoUrl: project.repoUrl,
    liveUrl: project.liveUrl,
    featured: project.featured,
    sortOrder: project.sortOrder,
    image: project.imageAsset ? mapAsset(project.imageAsset) : null,
    skills: project.skills.map(mapSkill),
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}
