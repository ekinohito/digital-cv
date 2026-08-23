import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminTokenGuard } from '../../common/auth/admin-token.guard';
import { CreateProjectInput } from './graphql/create-project.input';
import { ProjectObject } from './graphql/project.object';
import { UpdateProjectInput } from './graphql/update-project.input';
import { ProjectsService } from './projects.service';

@Resolver(() => ProjectObject)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => [ProjectObject])
  projects(
    @Args('featured', {
      type: () => Boolean,
      nullable: true,
    })
    featured?: boolean,
  ): Promise<ProjectObject[]> {
    return this.projectsService.findAll(featured);
  }

  @Query(() => ProjectObject, { nullable: true })
  project(@Args('slug') slug: string): Promise<ProjectObject | null> {
    return this.projectsService.findBySlug(slug);
  }

  @Mutation(() => ProjectObject)
  @UseGuards(AdminTokenGuard)
  createProject(
    @Args('input') input: CreateProjectInput,
  ): Promise<ProjectObject> {
    return this.projectsService.create(input);
  }

  @Mutation(() => ProjectObject)
  @UseGuards(AdminTokenGuard)
  updateProject(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateProjectInput,
  ): Promise<ProjectObject> {
    return this.projectsService.update(id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(AdminTokenGuard)
  deleteProject(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.projectsService.delete(id);
  }
}
