import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { AssetObject } from '../../assets/graphql/asset.object';
import { SkillObject } from '../../skills/graphql/skill.object';

@ObjectType()
export class ProjectObject {
  @Field(() => ID)
  id!: string;

  @Field()
  slug!: string;

  @Field()
  titleEn!: string;

  @Field()
  titleRu!: string;

  @Field()
  summaryEn!: string;

  @Field()
  summaryRu!: string;

  @Field(() => String, { nullable: true })
  detailsEn!: string | null;

  @Field(() => String, { nullable: true })
  detailsRu!: string | null;

  @Field(() => String, { nullable: true })
  repoUrl!: string | null;

  @Field(() => String, { nullable: true })
  liveUrl!: string | null;

  @Field()
  featured!: boolean;

  @Field(() => Int)
  sortOrder!: number;

  @Field(() => AssetObject, { nullable: true })
  image!: AssetObject | null;

  @Field(() => [SkillObject])
  skills!: SkillObject[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
