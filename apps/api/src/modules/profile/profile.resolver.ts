import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminTokenGuard } from '../../common/auth/admin-token.guard';
import { ProfileObject } from './graphql/profile.object';
import { UpdateProfileInput } from './graphql/update-profile.input';
import { ProfileService } from './profile.service';

@Resolver(() => ProfileObject)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileObject)
  profile(): Promise<ProfileObject> {
    return this.profileService.get();
  }

  @Mutation(() => ProfileObject)
  @UseGuards(AdminTokenGuard)
  updateProfile(
    @Args('input') input: UpdateProfileInput,
  ): Promise<ProfileObject> {
    return this.profileService.update(input);
  }
}
