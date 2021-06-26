import request from 'supertest';
import express from 'express';
import mongoProxy from 'shared/mongo.js';
import controller from './index.get.js';
import Scenario from '../../testsHelpers/Scenario.js';

const app = express();
app.get('/:newsletterId', controller);

const scenario = new Scenario('GET /[newsletterId]');
describe(scenario.scenario, () => {
  it('returns an array with the emails of the expecified newsletter', async () => {
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

    return request(app)
      .get(`/${newsletter2.toHexString()}`)
      .then((res) => {
        expect(res.body).toEqual([
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
});
