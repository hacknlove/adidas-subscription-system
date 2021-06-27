import getNewsletterSubscriptions from 'private-api/sdk/getNewsletterSubscriptions';
import Scenario from 'subscription/testsHelpers/Scenario.js';
import mongoProxy from 'shared/mongo.js';

const scenario = new Scenario('getNewsletterSubscriptions');
describe(scenario.scenario, () => {
  it('returns one subscription', async () => {
    await mongoProxy.waitFor;

    const [newsletter1, newsletter2] = scenario.objectIds(2);
    const [email1, email2, email3] = scenario.emails(3);
    const [subscription1, subscription2, subscription3] = scenario.objectIds(3);

    await mongoProxy.subscriptions.insertMany([
      {
        _id: subscription1,
        email: email1,
        newsletterId: [newsletter1],
        firstName: 'foo',
        gender: 'M',
        birthDate: '2000-01-01',
        consent: true,
      },
      {
        _id: subscription2,
        email: email2,
        newsletterId: [newsletter1, newsletter2],
        firstName: 'bar',
        gender: 'F',
        birthDate: '2000-01-02',
        consent: true,
      },
      {
        _id: subscription3,
        email: email3,
        newsletterId: [newsletter2],
        firstName: 'bar',
        gender: 'F',
        birthDate: '2000-01-03',
        consent: true,
      },
    ]);

    const subscriptions = await getNewsletterSubscriptions({
      newsletterId: newsletter2.toHexString(),
    });

    expect(subscriptions).toEqual([
      {
        _id: subscription2.toHexString(),
        email: email2,
        firstName: 'bar',
        gender: 'F',
        birthDate: '2000-01-02',
        consent: true,
      },
      {
        _id: subscription3.toHexString(),
        email: email3,
        firstName: 'bar',
        gender: 'F',
        birthDate: '2000-01-03',
        consent: true,
      },
    ]);
  });
});
