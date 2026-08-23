import { Readable } from 'node:stream';

export abstract class StorageService {
  abstract get bucket(): string;

  abstract put(key: string, data: Buffer, contentType: string): Promise<void>;

  abstract get(key: string): Promise<Readable>;

  abstract delete(key: string): Promise<void>;
}
