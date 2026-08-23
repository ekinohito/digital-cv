import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'node:stream';
import { StorageService } from './storage.service';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

@Injectable()
export class S3StorageService extends StorageService {
  private readonly client: S3Client;
  private readonly bucketName: string;

  constructor() {
    super();

    this.bucketName = requiredEnv('S3_BUCKET');

    this.client = new S3Client({
      region: process.env.S3_REGION ?? 'us-east-1',
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== 'false',
      credentials: {
        accessKeyId: requiredEnv('S3_ACCESS_KEY_ID'),
        secretAccessKey: requiredEnv('S3_SECRET_ACCESS_KEY'),
      },
    });
  }

  get bucket(): string {
    return this.bucketName;
  }

  async health(): Promise<void> {
    await this.client.send(new HeadBucketCommand({ Bucket: this.bucketName }));
  }

  async put(key: string, data: Buffer, contentType: string): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: data,
        ContentType: contentType,
      }),
    );
  }

  async get(key: string): Promise<Readable> {
    const output = await this.client.send(
      new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      }),
    );

    if (!output.Body) {
      throw new Error(`Object ${key} has no content`);
    }

    return output.Body as Readable;
  }

  async delete(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      }),
    );
  }
}
