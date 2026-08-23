import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AdminTokenGuard } from './admin-token.guard';

describe('AdminTokenGuard', () => {
  let guard: AdminTokenGuard;

  beforeEach(() => {
    guard = new AdminTokenGuard();
    process.env.ADMIN_ACCESS_TOKEN = 'correct-token';
  });

  afterEach(() => {
    delete process.env.ADMIN_ACCESS_TOKEN;
  });

  const makeHttpContext = (authorization?: string): ExecutionContext =>
    ({
      getType: () => 'http',
      switchToHttp: () => ({
        getRequest: () => ({ headers: authorization ? { authorization } : {} }),
      }),
    }) as unknown as ExecutionContext;

  const makeGraphqlContext = (authorization?: string): ExecutionContext => {
    const request = { headers: authorization ? { authorization } : {} };
    const graphqlContext = { req: request };
    const args = [null, {}, graphqlContext, {}];
    return {
      getType: () => 'graphql',
      getArgs: () => args,
      getArgByIndex: (index: number) => args[index],
      getClass: () => Object,
      getHandler: () => () => undefined,
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;
  };

  describe('HTTP requests', () => {
    it('activates for a valid bearer token', () => {
      expect(guard.canActivate(makeHttpContext('Bearer correct-token'))).toBe(
        true,
      );
    });

    it('rejects when the authorization header is missing', () => {
      expect(() => guard.canActivate(makeHttpContext())).toThrow(
        UnauthorizedException,
      );
    });

    it('rejects a wrong token', () => {
      expect(() =>
        guard.canActivate(makeHttpContext('Bearer wrong-token')),
      ).toThrow(UnauthorizedException);
    });

    it('rejects a non-bearer scheme', () => {
      expect(() =>
        guard.canActivate(makeHttpContext('Basic correct-token')),
      ).toThrow(UnauthorizedException);
    });
  });

  describe('GraphQL requests', () => {
    it('activates for a valid bearer token', () => {
      expect(
        guard.canActivate(makeGraphqlContext('Bearer correct-token')),
      ).toBe(true);
    });

    it('rejects a wrong token', () => {
      expect(() =>
        guard.canActivate(makeGraphqlContext('Bearer nope')),
      ).toThrow(UnauthorizedException);
    });
  });

  it('rejects everything when ADMIN_ACCESS_TOKEN is not configured', () => {
    delete process.env.ADMIN_ACCESS_TOKEN;
    expect(() =>
      guard.canActivate(makeHttpContext('Bearer correct-token')),
    ).toThrow(UnauthorizedException);
  });
});
