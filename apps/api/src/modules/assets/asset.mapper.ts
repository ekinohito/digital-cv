import { Asset } from '../../generated/prisma/client';
import { AssetObject } from './graphql/asset.object';

export function assetUrl(id: string): string {
  return `/api/assets/${id}`;
}

export function mapAsset(asset: Asset): AssetObject {
  return {
    id: asset.id,
    originalName: asset.originalName,
    mimeType: asset.mimeType,
    size: asset.size,
    url: assetUrl(asset.id),
    createdAt: asset.createdAt,
  };
}
