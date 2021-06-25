/**
 * @api {get} /[newsletterId] Get subscriptions for one newsletter
 * @apiName getNewsletterSubscriptions
 * @apiDescription Returns an array with the subscriptions of the expecified newsletter
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse newsletterId
*/


import mongoProxy, { ObjectId } from 'shared/mongo.js';

import seedrandom from 'seedrandom';

export default function scenarioToObjectIds (scenario) {

  beforeAll(() => mongoProxy.waitFor)
  beforeAll(() => mongoProxy.subscriptions.deleteMany({ scenario }));
  afterEach(() => mongoProxy.subscriptions.deleteMany({ scenario }));
  afterAll(async () => {
    await mongoProxy.client.close();
  });

  
  const rng = seedrandom(scenario);

  const prefix = Math.abs(rng.int32()).toString(16) + Math.abs(rng.int32()).toString(16)
  let i = 0;

  return function newObjectId () {
    return ObjectId(`${prefix}${(i++).toString(16)}${'0'.repeat(24)}`.substr(0, 24))
  }
}