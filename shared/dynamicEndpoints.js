import { resolve } from 'path';
import glob from 'glob';

const cwd = process.cwd();

const defaultRegexp = /^\.\/endpoints(\/.*)\.(post|get|put|delete|use|helper)\.js$/;
const defaultPath = './endpoints/**/*.js'

export default async function dynamicEndpoints (router, { path = defaultPath, regexp = defaultRegexp } = {}) {
  const files = glob.sync(path);
  files.sort((a, b) => {
    const lastA = a.replace(/\/\[/g, '/￿'); // unicode ffff last character
    const lastB = b.replace(/\/\[/g, '/￿');
    return lastA < lastB ? -1 : 1;
  });

  for (const file of files) {
    const match = file.match(regexp);
    if (!match) {
      console.warn(`${file} path cannot be parsed`);
      continue;
    }
    const [, route, method] = match;

    if (method === 'helper') {
      continue;
    }

    const { default: controller } = await import(resolve(cwd, file));


    const expressRoute = route.replace(
      /\/\[[a-z_]+\]/gi,
      (string) => `/:${string.substring(2, string.length - 1)}`,
    ).replace(/\/index$/, '');
    
    if (controller) {
      console.info(`${method.toUpperCase()} /api${expressRoute}`);

      if (Array.isArray(controller)) {
        router[method](expressRoute, ...controller);
      } else if (typeof controller === 'function') {
        router[method](expressRoute, controller);
      } else {
        console.warn(`Controller missing`);
      }
    } else {
      console.info(`${method.toUpperCase()} /api${expressRoute} missing controller`);

    }
  }
}