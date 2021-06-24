/* eslint-disable no-param-reassign */

function update(run, params) {
  const response = run.func(...params);
  run.cache.set(run.key, response);

  return response;
}

function expire(run) {
  if (run.expiry) {
    setTimeout(() => {
      run.cache.delete(run.key);
      run.revalidations.delete(run.key);
    }, run.expiry);
  }
}

async function returnAndUpdate(...params) {
  const specific = await this.paramsToKey(params);
  const run = {
    revalidate: this.revalidate,
    expiry: this.expiry,
    paramsToDefault: this.paramsToDefault,
    cache: this.cache,
    revalidations: this.revalidations,
    func: this.func,
  };

  if (typeof specific === 'string') {
    run.key = specific;
  } else if (!specific) {
    return run.func(...params);
  } else {
    Object.assign(run, specific);
  }

  let response = (await this.cache.get(run.key))

  if (!response || response.$dontCache) {
    response = run.default ?? (await run.paramsToDefault(params));
  }

  switch (this.revalidate) {
    case 'always':
    case true: {
      const updating = update(run, params);
      expire(run);
      return response ?? updating;
    }
    case 'never':
    case false:
    case undefined:
      break;
    default:
      if (typeof this.revalidate === 'number' && !this.revalidations.has(run.key)) {
        this.revalidations.set(run.key, setInterval(() => {
          update(run, params);
        }, this.revalidate));
        expire(run);
      }
  }
  return response ?? (expire(run) || update(run, params));
}

export default function cachedPromise(func, {
  expiry = 60000,
  paramsToKey = JSON.stringify,
  paramsToDefault = () => undefined,
  revalidate = 'never',
  cache = new Map(),
} = {}) {
  return returnAndUpdate.bind({
    func,
    expiry,
    revalidate,
    paramsToKey,
    paramsToDefault,
    cache,
    revalidations: new Map(),
  });
}
