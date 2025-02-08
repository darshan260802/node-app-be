import { IdentityMiddleware } from './identity.middleware';

describe('IdentityMiddleware', () => {
  it('should be defined', () => {
    expect(new IdentityMiddleware()).toBeDefined();
  });
});
