import request from 'supertest';
import express from 'express';
import mongoProxy from 'shared/mongo.js';
import controller from './[email].get.js';
import Scenario from '../../testsHelpers/Scenario.js';

const app = express();
app.get('/:newsletterId/:email', controller);

const scenario = new Scenario('GET /[newsletterId]/[email]');
describe(scenario.scenario, () => {
  it('returns one subscription', async () => {
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
      scenario,
    });

    return request(app)
      .get(`/${newsletter2.toHexString()}/${email}`)
      .then((res) => {
        expect(res.body).toEqual(
          {
            _id: _id.toHexString(),
            email,
            newsletterId: [newsletter1.toHexString(), newsletter2.toHexString()],
            firstName: 'bar',
            gender: 'F',
            birthDate: '2000-01-02',
            consent: true,
            scenario,
          },
        );
      });
  });
});
