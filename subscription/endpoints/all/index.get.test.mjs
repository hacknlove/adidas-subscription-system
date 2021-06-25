import controller from './index.get.js';
import request from 'supertest';
import express from 'express';
import mongoProxy from 'shared/mongo.js';
import scenarioToObjectIds from '../../testsHelpers/scenarioToObjectIds.js';

const app = express();
app.get('/', controller)

const scenario = 'get all subscriptions'

describe(scenario, () => {
  const newObjectId = scenarioToObjectIds(scenario);


  it('returns an array with emails and newsletterIds', async () => {
    const newsletter1 = newObjectId(scenario)
    const newsletter2 = newObjectId(scenario)

    await mongoProxy.subscriptions.insertMany([
      {
        _id: 'foo@all.com',
        newsletterId: [newsletter1],
        firstName: 'foo',
        gender: 'M',
        birthDate: '2000-01-01',
        consent: true,
        scenario,
      },
      {
        _id: 'bar@all.com',
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
      .then(res => {
        expect(res.body).toContainEqual(
          {
            _id: 'foo@all.com',
            newsletterId: [newsletter1.toHexString()],
          }
        )
        expect(res.body).toContainEqual(
          {
            _id: 'bar@all.com',
            newsletterId: [newsletter2.toHexString(), newsletter2.toHexString()],
          },
        )
      })
  })
})
