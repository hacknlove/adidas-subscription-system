import getAll from 'private-api/sdk/getAll.js';
import Scenario from 'subscription/testsHelpers/Scenario.js';
import mongoProxy from 'shared/mongo.js';

const scenario = new Scenario('getAll');
describe(scenario.scenario, () => {
  it('returns the list of subscriptions', async () => {
    await mongoProxy.waitFor;

    const [newsletter1, newsletter2, subscription1, subscription2] = scenario.objectIds(4);
    const [email1, email2] = scenario.emails(2);

    await mongoProxy.subscriptions.insertMany([
      {
        _id: subscription1,
        email: email1,
        newsletterId: [newsletter1],
        firstName: 'foo',
        gender: 'M',
        birthDate: '2000-01-01',
        consent: true,
        scenario,
      },
      {
        _id: subscription2,
        email: email2,
        newsletterId: [newsletter2, newsletter2],
        firstName: 'bar',
        gender: 'F',
        birthDate: '2000-01-02',
        consent: true,
        scenario,
      },
    ]);

    const all = await getAll();

    expect(all).toContainEqual(
      {
        _id: subscription1.toHexString(),
        email: email1,
        newsletterId: [newsletter1.toHexString()],
      },
    );
    expect(all).toContainEqual(
      {
        _id: subscription2.toHexString(),
        email: email2,
        newsletterId: [newsletter2.toHexString(), newsletter2.toHexString()],
      },
    );
  });
});
