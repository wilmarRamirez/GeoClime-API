import { ApiKeyGuard } from './apiKey.guard';

describe('ApiKeyGuard', () => {
  it('should be defined', () => {
    expect(new ApiKeyGuard()).toBeDefined();
  });
});
