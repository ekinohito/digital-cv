import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { timingSafeEqual } from 'node:crypto';
import type { Request } from 'express';

@Injectable()
export class AdminTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = this.getHttpRequest(context);
    const header = request.headers.authorization;

    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const provided = header.slice('Bearer '.length).trim();
    const configured = process.env.ADMIN_ACCESS_TOKEN;

    if (!configured || !this.matches(provided, configured)) {
      throw new UnauthorizedException('Invalid admin token');
    }

    return true;
  }

  private getHttpRequest(context: ExecutionContext): Request {
    if (context.getType<'http' | 'graphql'>() === 'graphql') {
      const graphqlContext = GqlExecutionContext.create(context).getContext<{
        req?: Request;
      }>();
      if (!graphqlContext.req) {
        throw new UnauthorizedException('Unable to authenticate the request');
      }
      return graphqlContext.req;
    }
    return context.switchToHttp().getRequest<Request>();
  }

  private matches(provided: string, configured: string): boolean {
    const providedBuffer = Buffer.from(provided, 'utf8');
    const configuredBuffer = Buffer.from(configured, 'utf8');
    return (
      providedBuffer.length === configuredBuffer.length &&
      timingSafeEqual(providedBuffer, configuredBuffer)
    );
  }
}
