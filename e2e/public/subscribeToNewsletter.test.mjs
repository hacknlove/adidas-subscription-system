import fetch from 'node-fetch';
import subscribeToNewsletter from 'public-api/sdk/subscribeToNewsletter';
import Scenario from 'subscription/testsHelpers/Scenario.js';
import mongoProxy from 'shared/mongo.js';

global.fetch = fetch;

const scenario = new Scenario('subscribeToNewsletter');
describe(scenario.scenario, () => {
  it('sends a verification email', async () => {
    await mongoProxy.waitFor;

    const [newsletterId, templateId] = scenario.objectIds(2);
    const email = scenario.email();

    const response = await subscribeToNewsletter({
      email,
      newsletterId: newsletterId.toHexString(),
      consent: true,
      templateId: templateId.toHexString(),
    });

    expect(response).toEqual(
      {
        sent: true,
      },
    );
  });
});
