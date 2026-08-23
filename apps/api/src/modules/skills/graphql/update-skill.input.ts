import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { SkillCategory } from './skill-category.enum';

@InputType()
export class UpdateSkillInput {
  @Field({ nullable: true })
  @IsOptional()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  name?: string;

  @Field(() => SkillCategory, { nullable: true })
  @IsOptional()
  @IsEnum(SkillCategory)
  category?: SkillCategory;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
