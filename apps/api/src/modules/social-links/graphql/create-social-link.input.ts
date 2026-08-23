import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString, MaxLength, IsUrl } from 'class-validator';

@InputType()
export class CreateSocialLinkInput {
  @Field()
  @IsString()
  @MaxLength(40)
  platform!: string;

  @Field()
  @IsString()
  @MaxLength(80)
  label!: string;

  @Field()
  @IsUrl()
  url!: string;

  @Field(() => Int)
  @IsInt()
  sortOrder!: number;
}
