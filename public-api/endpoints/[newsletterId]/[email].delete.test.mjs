import controller from './[email].delete.js';
import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.get('/:newsletterId/:email', ...controller)

process.env.JWT_SECRET = 'test'
process.env.SUBSCRIPTION_URL = 'fetch-echo'

describe('get all subscriptions', () => {
  it('pipes to the right microservice and endpont', () => request(app)
    .get(`/${'0'.repeat(24)}/foo@bar.buz?jwt=${jwt.sign({ sub: 'foo@bar.buz' }, process.env.JWT_SECRET)}`)
    .then(res => {
      expect(res.text).toBe(`["fetch-echo/${'0'.repeat(24)}/foo@bar.buz",{"method":"DELETE"}]`)
    })
  )

  it('errors if not allowed', () => request(app)
    .get(`/${'0'.repeat(24)}/foo@bar.buz?jwt=${jwt.sign({ sub: 'wrong' }, process.env.JWT_SECRET)}`)
    .then(res => {
      expect(res.body).toEqual({"error": {}, "notAuthenticated": true})
    })
  )
})