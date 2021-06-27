import getSubscription from 'private-api/sdk/getSubscription';
import Scenario from 'subscription/testsHelpers/Scenario.js';
import mongoProxy from 'shared/mongo.js';

const scenario = new Scenario('getSubscription');
describe(scenario.scenario, () => {
  it('returns one subscription', async () => {
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

    const subscription = await getSubscription({
      email,
      newsletterId: newsletter1.toHexString(),
    });

    expect(subscription).toEqual(
      {
        _id: _id.toHexString(),
        email,
        newsletterId: [newsletter1.toHexString(), newsletter2.toHexString()],
        firstName: 'bar',
        gender: 'F',
        birthDate: '2000-01-02',
        consent: true,
      },
    );
  });
});
