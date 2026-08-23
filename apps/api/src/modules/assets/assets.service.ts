import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { Readable } from 'node:stream';
import { extname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { StorageService } from '../../infrastructure/storage/storage.service';
import { mapPrismaKnownErrors } from '../../common/prisma-error.mapper';
import { AssetObject } from './graphql/asset.object';
import { mapAsset } from './asset.mapper';

const ALLOWED_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
  'text/plain',
  'text/markdown',
  'text/csv',
]);

const MAX_SIZE_BYTES = 10 * 1024 * 1024;

@Injectable()
export class AssetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async findAll(): Promise<AssetObject[]> {
    const assets = await this.prisma.asset.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return assets.map(mapAsset);
  }

  async create(input: {
    originalName: string;
    mimeType: string;
    data: Buffer;
  }): Promise<AssetObject> {
    if (!ALLOWED_MIME_TYPES.has(input.mimeType)) {
      throw new UnsupportedMediaTypeException(
        `Unsupported media type: ${input.mimeType}`,
      );
    }
    if (input.data.length === 0) {
      throw new BadRequestException('Uploaded file is empty');
    }
    if (input.data.length > MAX_SIZE_BYTES) {
      throw new BadRequestException('Uploaded file exceeds the 10 MB limit');
    }

    const key = this.buildObjectKey(input.originalName);
    await this.storage.put(key, input.data, input.mimeType);

    try {
      const asset = await this.prisma.asset.create({
        data: {
          bucket: this.storage.bucket,
          key,
          originalName: input.originalName,
          mimeType: input.mimeType,
          size: input.data.length,
        },
      });
      return mapAsset(asset);
    } catch (error) {
      await this.storage.delete(key).catch(() => undefined);
      throw mapPrismaKnownErrors(error, 'Asset');
    }
  }

  async getObject(
    id: string,
  ): Promise<{ asset: AssetObject; stream: Readable }> {
    const asset = await this.prisma.asset.findUnique({ where: { id } });
    if (!asset) {
      throw new NotFoundException('Asset not found');
    }
    const stream = await this.storage.get(asset.key);
    return { asset: mapAsset(asset), stream };
  }

  async delete(id: string): Promise<boolean> {
    const asset = await this.prisma.asset.findUnique({ where: { id } });
    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    await this.assertAssetIsNotInUse(id);

    await this.prisma.asset.delete({ where: { id } });
    await this.storage.delete(asset.key).catch(() => undefined);
    return true;
  }

  private async assertAssetIsNotInUse(id: string): Promise<void> {
    const [avatarProfile, resumeProfile, project] = await Promise.all([
      this.prisma.profile.findFirst({
        where: { avatarAssetId: id },
        select: { id: true },
      }),
      this.prisma.profile.findFirst({
        where: { resumeAssetId: id },
        select: { id: true },
      }),
      this.prisma.project.findFirst({
        where: { imageAssetId: id },
        select: { id: true },
      }),
    ]);

    if (avatarProfile || resumeProfile || project) {
      throw new ConflictException('Asset is used by the profile or a project');
    }
  }

  private buildObjectKey(originalName: string): string {
    const extension = /^[a-z0-9]{1,16}(\.[a-z0-9]{1,8})?$/.test(
      extname(originalName).toLowerCase(),
    )
      ? extname(originalName).toLowerCase()
      : '';
    return `${randomUUID()}${extension}`;
  }
}
