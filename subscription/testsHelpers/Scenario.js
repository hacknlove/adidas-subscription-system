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

export default class Scenario {
  constructor(scenario) {
    beforeAll(() => mongoProxy.waitFor);
    beforeAll(() => mongoProxy.subscriptions.deleteMany({ scenario }));
    afterEach(() => mongoProxy.subscriptions.deleteMany({ scenario }));
    afterAll(async () => {
      await mongoProxy.client.close();
    });

    const rng = seedrandom(scenario);
    this.prefix = Math.abs(rng.int32()).toString(16) + Math.abs(rng.int32()).toString(16);
    this.i = 0;
  }

  objectId() {
    return ObjectId(`${this.prefix}${(this.i++).toString(16)}${'0'.repeat(24)}`.substr(0, 24));
  }

  objectIds(howMany) {
    return Array.from({ length: howMany }, () => this.objectId());
  }

  email() {
    return `${this.prefix}${(this.i++).toString(16)}@example.test`;
  }

  emails(howMany) {
    return Array.from({ length: howMany }, () => this.email());
  }
}
