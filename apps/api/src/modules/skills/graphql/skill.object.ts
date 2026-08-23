import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { SkillCategory } from './skill-category.enum';

@ObjectType()
export class SkillObject {
  @Field(() => ID)
  id!: string;

  @Field()
  slug!: string;

  @Field()
  name!: string;

  @Field(() => SkillCategory)
  category!: SkillCategory;

  @Field(() => Int)
  sortOrder!: number;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
