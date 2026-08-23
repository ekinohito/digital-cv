import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AssetObject {
  @Field(() => ID)
  id!: string;

  @Field()
  originalName!: string;

  @Field()
  mimeType!: string;

  @Field(() => Int)
  size!: number;

  @Field()
  url!: string;

  @Field()
  createdAt!: Date;
}
