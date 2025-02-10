import { PublicIpMiddleware } from './public-ip.middleware';

describe('PublicIpMiddleware', () => {
  it('should be defined', () => {
    expect(new PublicIpMiddleware()).toBeDefined();
  });
});
