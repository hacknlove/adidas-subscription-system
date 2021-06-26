import request from 'supertest';
import express from 'express';
import mongoProxy from 'shared/mongo.js';
import controller from './index.get.js';
import Scenario from '../../testsHelpers/Scenario.js';

const app = express();
app.get('/', controller);

const scenario = new Scenario('GET /all');
describe(scenario.scenario, () => {
  it('returns an array with emails and newsletterIds', async () => {
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

    return request(app)
      .get('/')
      .then((res) => {
        expect(res.body).toContainEqual(
          {
            _id: subscription1.toHexString(),
            email: email1,
            newsletterId: [newsletter1.toHexString()],
          },
        );
        expect(res.body).toContainEqual(
          {
            _id: subscription2.toHexString(),
            email: email2,
            newsletterId: [newsletter2.toHexString(), newsletter2.toHexString()],
          },
        );
      });
  });
});
