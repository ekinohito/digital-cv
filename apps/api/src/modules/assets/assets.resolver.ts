import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AdminTokenGuard } from '../../common/auth/admin-token.guard';
import { assetUrl } from './asset.mapper';
import { AssetObject } from './graphql/asset.object';
import { AssetsService } from './assets.service';

@Resolver(() => AssetObject)
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Query(() => [AssetObject])
  @UseGuards(AdminTokenGuard)
  assets(): Promise<AssetObject[]> {
    return this.assetsService.findAll();
  }

  @Mutation(() => Boolean)
  @UseGuards(AdminTokenGuard)
  deleteAsset(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.assetsService.delete(id);
  }

  @ResolveField(() => String)
  url(@Parent() asset: AssetObject): string {
    return assetUrl(asset.id);
  }
}
