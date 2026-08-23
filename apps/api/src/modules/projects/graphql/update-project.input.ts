import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';

@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(160)
  titleEn?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(160)
  titleRu?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  summaryEn?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  summaryRu?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  detailsEn?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  detailsRu?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl()
  repoUrl?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl()
  liveUrl?: string | null;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  sortOrder?: number;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  imageAssetId?: string | null;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  skillIds?: string[];
}
