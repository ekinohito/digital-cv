import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, MaxLength, IsUrl } from 'class-validator';

@InputType()
export class UpdateSocialLinkInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  platform?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  label?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  url?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
