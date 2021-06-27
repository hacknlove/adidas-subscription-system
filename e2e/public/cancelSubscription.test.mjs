import fetch from 'node-fetch';
import cancelSubscription from 'public-api/sdk/cancelSubscription.js';
import Scenario from 'subscription/testsHelpers/Scenario.js';
import mongoProxy from 'shared/mongo.js';
import jwt from 'jsonwebtoken';

global.fetch = fetch;

const scenario = new Scenario('cancelSubscription');
describe(scenario.scenario, () => {
  it('cancels a subscription', async () => {
    await mongoProxy.waitFor;

    const [newsletter1, newsletter2] = scenario.objectIds(2);
    const email = scenario.email();
    const _id = scenario.objectId();

    await mongoProxy.subscriptions.insertOne({
      _id,
      email,
      newsletterId: [newsletter1, newsletter2],
      firstName: 'bar',
      gender: 'F',
      birthDate: '2000-01-02',
      consent: true,
    });

    const token = jwt.sign({ sub: email, iss: newsletter2.toHexString(), expiresIn: '1h' }, process.env.JWT_SECRET);

    const result = await cancelSubscription({
      newsletterId: newsletter2.toHexString(),
      email,
      token,
    });

    expect(result).toEqual({ canceled: true });

    const subscription = await mongoProxy.subscriptions.findOne(
      { _id },
      { projection: { newsletterId: 1 } },
    );

    expect(subscription).toEqual({
      _id,
      newsletterId: [newsletter1],
    });
  });
});
