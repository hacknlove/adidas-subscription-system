import app from './setUpExpress.js';
import dynamicEndpoints from './dynamicEndpoints.js';

export default async function startup() {
  await dynamicEndpoints(app)

  app.listen(process.env.PORT ?? 8000, process.env.IP ?? '0.0.0.0')
}
