import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminTokenGuard } from '../../common/auth/admin-token.guard';
import { CreateSkillInput } from './graphql/create-skill.input';
import { SkillCategory } from './graphql/skill-category.enum';
import { SkillObject } from './graphql/skill.object';
import { UpdateSkillInput } from './graphql/update-skill.input';
import { SkillsService } from './skills.service';

@Resolver(() => SkillObject)
export class SkillsResolver {
  constructor(private readonly skillsService: SkillsService) {}

  @Query(() => [SkillObject])
  skills(
    @Args('category', {
      type: () => SkillCategory,
      nullable: true,
    })
    category?: SkillCategory,
  ): Promise<SkillObject[]> {
    return this.skillsService.findAll(category);
  }

  @Mutation(() => SkillObject)
  @UseGuards(AdminTokenGuard)
  createSkill(@Args('input') input: CreateSkillInput): Promise<SkillObject> {
    return this.skillsService.create(input);
  }

  @Mutation(() => SkillObject)
  @UseGuards(AdminTokenGuard)
  updateSkill(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateSkillInput,
  ): Promise<SkillObject> {
    return this.skillsService.update(id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(AdminTokenGuard)
  deleteSkill(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.skillsService.delete(id);
  }
}
