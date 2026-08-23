import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AssetObject } from '../../assets/graphql/asset.object';

@ObjectType()
export class ProfileObject {
  @Field(() => ID)
  id!: string;

  @Field()
  fullName!: string;

  @Field()
  headlineEn!: string;

  @Field()
  headlineRu!: string;

  @Field()
  summaryEn!: string;

  @Field()
  summaryRu!: string;

  @Field()
  email!: string;

  @Field(() => String, { nullable: true })
  githubUrl!: string | null;

  @Field(() => AssetObject, { nullable: true })
  avatar!: AssetObject | null;

  @Field(() => AssetObject, { nullable: true })
  resume!: AssetObject | null;

  @Field()
  updatedAt!: Date;
}
