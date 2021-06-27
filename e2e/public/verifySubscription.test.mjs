import fetch from 'node-fetch';
import verifySubscription from 'public-api/sdk/verifySubscription';
import Scenario from 'subscription/testsHelpers/Scenario.js';
import mongoProxy from 'shared/mongo.js';
import jwt from 'jsonwebtoken';

global.fetch = fetch;

const scenario = new Scenario('verifySubscription');
describe(scenario.scenario, () => {
  it('returns the list of subscriptions', async () => {
    await mongoProxy.waitFor;

    const _id = scenario.objectId();
    const email = scenario.email();
    const [newsletter1, newsletter2] = scenario.objectIds(2);

    await mongoProxy.subscriptions.insertOne(
      {
        _id,
        email,
        newsletterId: [newsletter1],
        firstName: 'foo',
        gender: 'X',
        birthDate: '2000-01-01',
      },
    );

    const token = jwt.sign({ sub: email, iss: newsletter2.toHexString(), expiresIn: '1h' }, process.env.JWT_SECRET);

    const response = await verifySubscription({
      email,
      newsletterId: newsletter2.toHexString(),
      token,
      firstName: 'john',
      birthDate: '1970-01-01',
      gender: 'M',
    });

    expect(response).toEqual({ subscriptionId: _id.toHexString() });

    const subscription = await mongoProxy.subscriptions.findOne({ _id });

    expect(subscription).toEqual(
      {
        _id,
        email,
        newsletterId: [newsletter1, newsletter2],
        firstName: 'john',
        birthDate: '1970-01-01',
        gender: 'M',
      },
    );
  });
});
