import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { mapPrismaKnownErrors } from '../../common/prisma-error.mapper';
import { CreateProjectInput } from './graphql/create-project.input';
import { ProjectObject } from './graphql/project.object';
import { UpdateProjectInput } from './graphql/update-project.input';
import { mapProject } from './project.mapper';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(featured?: boolean): Promise<ProjectObject[]> {
    const projects = await this.prisma.project.findMany({
      where: featured === undefined ? undefined : { featured },
      include: { skills: true, imageAsset: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return projects.map(mapProject);
  }

  async findBySlug(slug: string): Promise<ProjectObject | null> {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: { skills: true, imageAsset: true },
    });
    return project ? mapProject(project) : null;
  }

  async create(input: CreateProjectInput): Promise<ProjectObject> {
    await this.assertReferencesExist(
      input.skillIds,
      input.imageAssetId ?? null,
    );

    try {
      const project = await this.prisma.project.create({
        data: {
          slug: input.slug,
          titleEn: input.titleEn,
          titleRu: input.titleRu,
          summaryEn: input.summaryEn,
          summaryRu: input.summaryRu,
          detailsEn: input.detailsEn ?? null,
          detailsRu: input.detailsRu ?? null,
          repoUrl: input.repoUrl ?? null,
          liveUrl: input.liveUrl ?? null,
          featured: input.featured,
          sortOrder: input.sortOrder,
          ...(input.imageAssetId
            ? { imageAsset: { connect: { id: input.imageAssetId } } }
            : {}),
          skills: { connect: input.skillIds.map((id) => ({ id })) },
        },
        include: { skills: true, imageAsset: true },
      });
      return mapProject(project);
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'Project');
    }
  }

  async update(id: string, input: UpdateProjectInput): Promise<ProjectObject> {
    await this.assertReferencesExist(
      input.skillIds ?? [],
      input.imageAssetId === undefined ? undefined : input.imageAssetId,
    );

    try {
      const project = await this.prisma.project.update({
        where: { id },
        data: {
          slug: input.slug,
          titleEn: input.titleEn,
          titleRu: input.titleRu,
          summaryEn: input.summaryEn,
          summaryRu: input.summaryRu,
          detailsEn: input.detailsEn,
          detailsRu: input.detailsRu,
          repoUrl: input.repoUrl,
          liveUrl: input.liveUrl,
          featured: input.featured,
          sortOrder: input.sortOrder,
          imageAsset:
            input.imageAssetId === undefined
              ? undefined
              : input.imageAssetId === null
                ? { disconnect: true }
                : { connect: { id: input.imageAssetId } },
          ...(input.skillIds !== undefined && input.skillIds !== null
            ? {
                skills: {
                  set: input.skillIds.map((skillId) => ({ id: skillId })),
                },
              }
            : {}),
        },
        include: { skills: true, imageAsset: true },
      });
      return mapProject(project);
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'Project');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.project.delete({ where: { id } });
      return true;
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'Project');
    }
  }

  private async assertReferencesExist(
    skillIds: string[],
    imageAssetId?: string | null,
  ): Promise<void> {
    if (skillIds.length > 0) {
      const count = await this.prisma.skill.count({
        where: { id: { in: skillIds } },
      });
      if (count !== new Set(skillIds).size) {
        throw new BadRequestException('One or more skillIds do not exist');
      }
    }

    if (imageAssetId) {
      const asset = await this.prisma.asset.findUnique({
        where: { id: imageAssetId },
        select: { id: true },
      });
      if (!asset) {
        throw new NotFoundException(`Asset ${imageAssetId} does not exist`);
      }
    }
  }
}
