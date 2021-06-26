import request from 'supertest';
import express from 'express';
import mongoProxy from 'shared/mongo.js';
import controller from './[email].post.js';
import Scenario from '../../testsHelpers/Scenario.js';

const app = express();
app.post('/:newsletterId/:email', express.json());
app.post('/:newsletterId/:email', controller);

const scenario = new Scenario('POST /[newsletterId]/[email]');
describe(scenario.scenario, () => {
  it('void', () => {
    expect(true).toBe(true);
  });
  it('adds a new newsletterId to an existant subscription, and updates the fields', async () => {
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

    await request(app)
      .post(`/${newsletter2.toHexString()}/${email}`)
      .send({
        firstName: 'john',
        birthDate: '1970-01-01',
        gender: 'M',
      })
      .then((res) => {
        expect(res.body).toEqual({ subscriptionId: _id.toHexString() });
      });

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

  it('adds creates a new subscription', async () => {
    const email = scenario.email();
    const newsletter1 = scenario.objectId();

    await request(app)
      .post(`/${newsletter1.toHexString()}/${email}`)
      .send({
        firstName: 'john',
        birthDate: '1970-01-01',
        gender: 'M',
      })
      .then(async (res) => {
        const subscription = await mongoProxy.subscriptions.findOne({ email });

        expect(res.body).toEqual({ subscriptionId: subscription._id.toHexString() });

        expect(subscription).toEqual(
          {
            _id: subscription._id,
            email,
            newsletterId: [newsletter1],
            firstName: 'john',
            birthDate: '1970-01-01',
            gender: 'M',
          },
        );
      });
  });
});
