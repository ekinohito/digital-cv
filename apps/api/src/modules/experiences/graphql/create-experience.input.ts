import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  ArrayUnique,
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateExperienceInput {
  @Field()
  @IsString()
  @MaxLength(120)
  company!: string;

  @Field()
  @IsString()
  @MaxLength(160)
  roleEn!: string;

  @Field()
  @IsString()
  @MaxLength(160)
  roleRu!: string;

  @Field()
  @IsString()
  @MaxLength(5000)
  descriptionEn!: string;

  @Field()
  @IsString()
  @MaxLength(5000)
  descriptionRu!: string;

  @Field()
  @IsDate()
  startDate!: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  endDate?: Date | null;

  @Field(() => Int)
  @IsInt()
  sortOrder!: number;

  @Field(() => [ID])
  @IsArray()
  @ArrayUnique()
  skillIds!: string[];
}
