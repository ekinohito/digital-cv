import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminTokenGuard } from '../../common/auth/admin-token.guard';
import { CreateSocialLinkInput } from './graphql/create-social-link.input';
import { SocialLinkObject } from './graphql/social-link.object';
import { UpdateSocialLinkInput } from './graphql/update-social-link.input';
import { SocialLinksService } from './social-links.service';

@Resolver(() => SocialLinkObject)
export class SocialLinksResolver {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Query(() => [SocialLinkObject])
  socialLinks(): Promise<SocialLinkObject[]> {
    return this.socialLinksService.findAll();
  }

  @Mutation(() => SocialLinkObject)
  @UseGuards(AdminTokenGuard)
  createSocialLink(
    @Args('input') input: CreateSocialLinkInput,
  ): Promise<SocialLinkObject> {
    return this.socialLinksService.create(input);
  }

  @Mutation(() => SocialLinkObject)
  @UseGuards(AdminTokenGuard)
  updateSocialLink(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateSocialLinkInput,
  ): Promise<SocialLinkObject> {
    return this.socialLinksService.update(id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(AdminTokenGuard)
  deleteSocialLink(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.socialLinksService.delete(id);
  }
}
