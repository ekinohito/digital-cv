import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { mapPrismaKnownErrors } from '../../common/prisma-error.mapper';
import { CreateSocialLinkInput } from './graphql/create-social-link.input';
import { SocialLinkObject } from './graphql/social-link.object';
import { UpdateSocialLinkInput } from './graphql/update-social-link.input';
import { mapSocialLink } from './social-link.mapper';

@Injectable()
export class SocialLinksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<SocialLinkObject[]> {
    const socialLinks = await this.prisma.socialLink.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });
    return socialLinks.map(mapSocialLink);
  }

  async create(input: CreateSocialLinkInput): Promise<SocialLinkObject> {
    try {
      const socialLink = await this.prisma.socialLink.create({
        data: {
          platform: input.platform,
          label: input.label,
          url: input.url,
          sortOrder: input.sortOrder,
        },
      });
      return mapSocialLink(socialLink);
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'SocialLink');
    }
  }

  async update(
    id: string,
    input: UpdateSocialLinkInput,
  ): Promise<SocialLinkObject> {
    try {
      const socialLink = await this.prisma.socialLink.update({
        where: { id },
        data: {
          platform: input.platform,
          label: input.label,
          url: input.url,
          sortOrder: input.sortOrder,
        },
      });
      return mapSocialLink(socialLink);
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'SocialLink');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.socialLink.delete({ where: { id } });
      return true;
    } catch (error) {
      throw mapPrismaKnownErrors(error, 'SocialLink');
    }
  }
}
