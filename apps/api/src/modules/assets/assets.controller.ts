import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { AdminTokenGuard } from '../../common/auth/admin-token.guard';
import { AssetsService } from './assets.service';
import { AssetObject } from './graphql/asset.object';

const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;

function contentDisposition(filename: string): string {
  const asciiFallback = filename
    .replace(/[^\x20-\x7e]/g, '_')
    .replace(/["\\]/g, '_');
  return `inline; filename="${asciiFallback}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

@Controller()
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post('api/admin/assets')
  @UseGuards(AdminTokenGuard)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_UPLOAD_SIZE_BYTES } }),
  )
  async upload(
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<AssetObject> {
    if (!file) {
      throw new BadRequestException('Multipart form field "file" is required');
    }
    return this.assetsService.create({
      originalName: file.originalname,
      mimeType: file.mimetype,
      data: file.buffer,
    });
  }

  @Get('api/assets/:id')
  async download(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const { asset, stream } = await this.assetsService.getObject(id);

    response.setHeader('Content-Type', asset.mimeType);
    response.setHeader(
      'Content-Disposition',
      contentDisposition(asset.originalName),
    );
    response.setHeader('Content-Length', asset.size);

    return new StreamableFile(stream);
  }
}
