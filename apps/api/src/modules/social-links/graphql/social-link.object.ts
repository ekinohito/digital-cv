import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SocialLinkObject {
  @Field(() => ID)
  id!: string;

  @Field()
  platform!: string;

  @Field()
  label!: string;

  @Field()
  url!: string;

  @Field(() => Int)
  sortOrder!: number;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
