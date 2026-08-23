import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminTokenGuard } from '../../common/auth/admin-token.guard';
import { CreateExperienceInput } from './graphql/create-experience.input';
import { ExperienceObject } from './graphql/experience.object';
import { UpdateExperienceInput } from './graphql/update-experience.input';
import { ExperiencesService } from './experiences.service';

@Resolver(() => ExperienceObject)
export class ExperiencesResolver {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Query(() => [ExperienceObject])
  experiences(): Promise<ExperienceObject[]> {
    return this.experiencesService.findAll();
  }

  @Mutation(() => ExperienceObject)
  @UseGuards(AdminTokenGuard)
  createExperience(
    @Args('input') input: CreateExperienceInput,
  ): Promise<ExperienceObject> {
    return this.experiencesService.create(input);
  }

  @Mutation(() => ExperienceObject)
  @UseGuards(AdminTokenGuard)
  updateExperience(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateExperienceInput,
  ): Promise<ExperienceObject> {
    return this.experiencesService.update(id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(AdminTokenGuard)
  deleteExperience(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.experiencesService.delete(id);
  }
}
