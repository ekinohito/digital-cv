import { Prisma } from '../../generated/prisma/client';
import { mapAsset } from '../assets/asset.mapper';
import { ProfileObject } from './graphql/profile.object';

export type ProfileWithAssets = Prisma.ProfileGetPayload<{
  include: { avatarAsset: true; resumeAsset: true };
}>;

export function mapProfile(profile: ProfileWithAssets): ProfileObject {
  return {
    id: profile.id,
    fullName: profile.fullName,
    headlineEn: profile.headlineEn,
    headlineRu: profile.headlineRu,
    summaryEn: profile.summaryEn,
    summaryRu: profile.summaryRu,
    email: profile.email,
    githubUrl: profile.githubUrl,
    avatar: profile.avatarAsset ? mapAsset(profile.avatarAsset) : null,
    resume: profile.resumeAsset ? mapAsset(profile.resumeAsset) : null,
    updatedAt: profile.updatedAt,
  };
}
