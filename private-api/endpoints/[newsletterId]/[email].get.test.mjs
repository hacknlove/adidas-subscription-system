import controller from './[email].get.js';
import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.get('/:newsletterId/:email', ...controller)

process.env.JWT_SECRET = 'test'
process.env.SUBSCRIPTION_URL = 'fetch-echo'

describe('get all subscriptions', () => {

  it('pipes to the right microservice and endpont', () => request(app)
    .get(`/${'0'.repeat(24)}/Foo@bar.Buz?jwt=${jwt.sign({ sub: 'admin' }, process.env.JWT_SECRET)}`)
    .then(res => {
      expect(res.text).toBe(`["fetch-echo/${'0'.repeat(24)}/foo@bar.buz",{}]`)
    })
  )

  it('errors if not allowed', () => request(app)
    .get(`/${'0'.repeat(24)}/foo@bar.buz?jwt=${jwt.sign({ sub: 'wrong' }, process.env.JWT_SECRET)}`)
    .then(res => {
      expect(res.body).toEqual({"error": {}, "notAuthenticated": true})
    })
  )
})