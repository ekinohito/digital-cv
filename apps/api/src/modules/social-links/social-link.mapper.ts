import { SocialLink } from '../../generated/prisma/client';
import { SocialLinkObject } from './graphql/social-link.object';

export function mapSocialLink(socialLink: SocialLink): SocialLinkObject {
  return {
    id: socialLink.id,
    platform: socialLink.platform,
    label: socialLink.label,
    url: socialLink.url,
    sortOrder: socialLink.sortOrder,
    createdAt: socialLink.createdAt,
    updatedAt: socialLink.updatedAt,
  };
}
