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
export class CreateProjectInput {
  @Field()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;

  @Field()
  @IsString()
  @MaxLength(160)
  titleEn!: string;

  @Field()
  @IsString()
  @MaxLength(160)
  titleRu!: string;

  @Field()
  @IsString()
  @MaxLength(1000)
  summaryEn!: string;

  @Field()
  @IsString()
  @MaxLength(1000)
  summaryRu!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  detailsEn?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  detailsRu?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  repoUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  liveUrl?: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  featured = false;

  @Field(() => Int)
  @IsInt()
  sortOrder!: number;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  imageAssetId?: string;

  @Field(() => [ID])
  @IsArray()
  @ArrayUnique()
  skillIds!: string[];
}
