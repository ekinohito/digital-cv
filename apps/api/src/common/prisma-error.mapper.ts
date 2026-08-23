import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';

export function mapPrismaKnownErrors(error: unknown, entity: string): unknown {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new ConflictException(`${entity} violates a unique constraint`);
      case 'P2025':
        return new NotFoundException(`${entity} not found`);
      default:
        return error;
    }
  }
  return error;
}
