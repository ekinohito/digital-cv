import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsString, Matches, MaxLength } from 'class-validator';
import { SkillCategory } from './skill-category.enum';

@InputType()
export class CreateSkillInput {
  @Field()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;

  @Field()
  @IsString()
  @MaxLength(80)
  name!: string;

  @Field(() => SkillCategory)
  @IsEnum(SkillCategory)
  category!: SkillCategory;

  @Field(() => Int)
  @IsInt()
  sortOrder!: number;
}
