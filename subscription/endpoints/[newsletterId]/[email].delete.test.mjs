import request from 'supertest';
import express from 'express';
import mongoProxy from 'shared/mongo.js';
import controller from './[email].delete.js';
import Scenario from '../../testsHelpers/Scenario.js';

const app = express();
app.delete('/:newsletterId/:email', controller);

const scenario = new Scenario('DELETE /[newsletterId]/[email]');
describe(scenario.scenario, () => {
  it('removes the newsletterId and return ok:true', async () => {
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

    await request(app)
      .delete(`/${newsletter2.toHexString()}/${email}`)
      .then((res) => {
        expect(res.body).toEqual({ ok: true });
      });

    const subscription = await mongoProxy.subscriptions.findOne(
      { _id },
      { projection: { newsletterId: 1 } },
    );

    expect(subscription).toEqual({
      _id,
      newsletterId: [newsletter1],
    });
  });

  it('removes the subscription and return ok:true', async () => {
    const newsletter1 = scenario.objectId();
    const email = scenario.email();
    const _id = scenario.objectId();

    await mongoProxy.subscriptions.insertOne({
      _id,
      email,
      newsletterId: [newsletter1],
      firstName: 'bar',
      gender: 'F',
      birthDate: '2000-01-02',
      consent: true,
      scenario,
    });

    await request(app)
      .delete(`/${newsletter1.toHexString()}/${email}`)
      .then((res) => {
        expect(res.body).toEqual({ ok: true });
      });

    const subscription = await mongoProxy.subscriptions.findOne(
      { _id },
      { projection: { newsletterId: 1 } },
    );

    expect(subscription).toBeNull();
  });
});
