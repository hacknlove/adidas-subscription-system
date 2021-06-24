import cachedPromise from './cachedPromise';

describe('basic usage', () => {
  it('dumb', () => {
    expect(true).toBe(true);
  });

  it('creates a function', () => {
    const cached = cachedPromise(async () => true);

    expect(cached).toBeInstanceOf(Function);
  });

  it('returns the default value if there is nothing cached', async () => {
    const cached = cachedPromise(async () => 'this is the actual value', {
      paramsToDefault() { return 'this is the default value'; },
    });

    expect(await cached()).toBe('this is the default value');
  });

  it('returns the actual value if there is nothing cached and no default value', async () => {
    const cached = cachedPromise(async () => 'this is the actual value');

    expect(await cached()).toBe('this is the actual value');
  });

  it('does not call the function if there is a cached value and revalidate is undefined', async () => {
    const func = jest.fn(() => 'actual value');

    const cached = cachedPromise(func);

    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(1);
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('does not call the function if there is a cached value and revalidate is undefined', async () => {
    const func = jest.fn(() => 'actual value');

    const cached = cachedPromise(func);

    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(1);
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(1);
  });
  it('does not call the function if there is a cached value and revalidate is "never"', async () => {
    const func = jest.fn(() => 'actual value');

    const cached = cachedPromise(func, { revalidate: 'never' });

    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(1);
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('calls the function if revalidate is true', async () => {
    const func = jest.fn(() => 'actual value');

    const cached = cachedPromise(func, { revalidate: true });

    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(1);
    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(2);
    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(3);
  });

  it('calls the function if revalidate is "always"', async () => {
    const func = jest.fn(() => 'actual value');

    const cached = cachedPromise(func, { revalidate: 'always' });

    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(1);
    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(2);
    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(3);
  });

  it('calls the function after [revalidate] milliseconds', async () => {
    const func = jest.fn(() => 'actual value');

    const cached = cachedPromise(func, { revalidate: 500 });

    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(1);
    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(1);
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(func).toHaveBeenCalledTimes(2);
    expect(await cached()).toBe('actual value');
    expect(func).toHaveBeenCalledTimes(2);
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(func).toHaveBeenCalledTimes(3);
  });
});
