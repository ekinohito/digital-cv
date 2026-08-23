import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { SkillObject } from '../../skills/graphql/skill.object';

@ObjectType()
export class ExperienceObject {
  @Field(() => ID)
  id!: string;

  @Field()
  company!: string;

  @Field()
  roleEn!: string;

  @Field()
  roleRu!: string;

  @Field()
  descriptionEn!: string;

  @Field()
  descriptionRu!: string;

  @Field()
  startDate!: Date;

  @Field(() => Date, { nullable: true })
  endDate!: Date | null;

  @Field(() => Int)
  sortOrder!: number;

  @Field(() => [SkillObject])
  skills!: SkillObject[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
