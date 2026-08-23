import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { mapPrismaKnownErrors } from '../../common/prisma-error.mapper';
import { ProfileObject } from './graphql/profile.object';
import { UpdateProfileInput } from './graphql/update-profile.input';
import { mapProfile } from './profile.mapper';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async get(): Promise<ProfileObject> {
    const profile = await this.prisma.profile.findFirst({
      include: { avatarAsset: true, resumeAsset: true },
    });
    if (!profile) {
      throw new NotFoundException('Profile is not configured yet');
    }
    return mapProfile(profile);
  }

  async update(input: UpdateProfileInput): Promise<ProfileObject> {
    await this.assertAssetsExist(input);

    const existing = await this.prisma.profile.findFirst({
      select: { id: true },
    });

    try {
      const profile = existing
        ? await this.prisma.profile.update({
            where: { id: existing.id },
            data: {
              fullName: input.fullName,
              headlineEn: input.headlineEn,
              headlineRu: input.headlineRu,
              summaryEn: input.summaryEn,
              summaryRu: input.summaryRu,
              email: input.email,
              githubUrl: input.githubUrl,
              avatarAsset: this.relationChange(input.avatarAssetId),
              resumeAsset: this.relationChange(input.resumeAssetId),
            },
            include: { avatarAsset: true, resumeAsset: true },
          })
        : await this.prisma.profile.create({
            data: {
              fullName: input.fullName ?? '',
              headlineEn: input.headlineEn ?? '',
              headlineRu: input.headlineRu ?? '',
              summaryEn: input.summaryEn ?? '',
              summaryRu: input.summaryRu ?? '',
              email: input.email ?? '',
              githubUrl: input.githubUrl ?? null,
              ...(input.avatarAssetId
                ? { avatarAsset: { connect: { id: input.avatarAssetId } } }
                : {}),
              ...(input.resumeAssetId
                ? { resumeAsset: { connect: { id: input.resumeAssetId } } }
                : {}),
            },
            include: { avatarAsset: true, resumeAsset: true },
          });
      return mapProfile(profile);
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'Profile');
    }
  }

  private relationChange(
    assetId: string | null | undefined,
  ): { connect: { id: string } } | { disconnect: true } | undefined {
    if (assetId === undefined) {
      return undefined;
    }
    return assetId === null
      ? { disconnect: true }
      : { connect: { id: assetId } };
  }

  private async assertAssetsExist(input: UpdateProfileInput): Promise<void> {
    const assetIds = [input.avatarAssetId, input.resumeAssetId].filter(
      (assetId): assetId is string => assetId != null,
    );

    if (assetIds.length === 0) {
      return;
    }

    const count = await this.prisma.asset.count({
      where: { id: { in: assetIds } },
    });
    if (count !== new Set(assetIds).size) {
      throw new BadRequestException('One or more asset ids do not exist');
    }
  }
}
