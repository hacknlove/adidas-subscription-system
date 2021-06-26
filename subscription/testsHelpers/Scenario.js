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
    afterEach(() => mongoProxy.subscriptions.deleteMany({
      $or: [
        {
          _id: { $in: this.usedIdes },
        },
        {
          newsletterId: { $in: this.usedIdes },
        },
        {
          email: { $in: this.usedEmails },
        },

      ],
    }));
    afterAll(async () => {
      await mongoProxy.client.close();
    });

    this.usedIdes = [];
    this.usedEmails = [];

    this.scenario = scenario;

    const rng = seedrandom(scenario);
    this.prefix = Math.abs(rng.int32()).toString(16) + Math.abs(rng.int32()).toString(16);
    this.i = 0;
  }

  objectId() {
    const o = ObjectId(`${this.prefix}${(this.i++).toString(16)}${'0'.repeat(24)}`.substr(0, 24));
    this.usedIdes.push(o);
    return o;
  }

  objectIds(howMany) {
    return Array.from({ length: howMany }, () => this.objectId());
  }

  email() {
    const e = `${this.prefix}${(this.i++).toString(16)}@example.test`;
    this.usedEmails.push(e);
    return e;
  }

  emails(howMany) {
    return Array.from({ length: howMany }, () => this.email());
  }
}
