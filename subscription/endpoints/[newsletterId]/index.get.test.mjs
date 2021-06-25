import controller from './index.get.js';
import request from 'supertest';
import express from 'express';
import mongoProxy from 'shared/mongo.js';
import scenarioToObjectIds from '../../testsHelpers/scenarioToObjectIds.js';


const app = express();
app.get('/:newsletterId', controller)

const scenario = 'get newsletter\'s subscriptions'

describe(scenario, () => {
  const newObjectId = scenarioToObjectIds(scenario);

  it('returns an array with the emails of the expecified newsletter', async () => {
    const newsletter1 = newObjectId()
    const newsletter2 = newObjectId()
    await mongoProxy.subscriptions.insertMany([
      {
        _id: 'foo@get.com',
        newsletterId: [newsletter1],
        firstName: 'foo',
        gender: 'M',
        birthDate: '2000-01-01',
        consent: true,
        scenario,
      },
      {
        _id: 'bar@get.com',
        newsletterId: [newsletter1, newsletter2],
        firstName: 'bar',
        gender: 'F',
        birthDate: '2000-01-02',
        consent: true,
        scenario,
      },
      {
        _id: 'buz@get.com',
        newsletterId: [newsletter2],
        firstName: 'bar',
        gender: 'F',
        birthDate: '2000-01-03',
        consent: true,
        scenario,
      },
    ]);

    return request(app)
      .get(`/${newsletter2.toHexString()}`)
      .then(res => {
        expect(res.body).toEqual([
          'bar@get.com', 'buz@get.com'
        ])
      })
  })
})
