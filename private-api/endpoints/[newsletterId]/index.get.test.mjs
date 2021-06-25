import controller from './index.get.js';
import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.get('/:newsletterId', ...controller)

process.env.JWT_SECRET = 'test'
process.env.SUBSCRIPTION_URL = 'fetch-echo'

describe('get all subscriptions', () => {

  it('pipes to the right microservice and endpont', () => request(app)
    .get(`/${'0'.repeat(24)}?jwt=${jwt.sign({ sub: 'admin' }, process.env.JWT_SECRET)}`)
    .then(res => {
      expect(res.text).toBe(`["fetch-echo/${'0'.repeat(24)}",{}]`)
    })
  )

  it('errors if not allowed', () => request(app)
    .get(`/${'0'.repeat(24)}?jwt=${jwt.sign({ sub: 'wrong' }, process.env.JWT_SECRET)}`)
    .then(res => {
      expect(res.body).toEqual({"error": {}, "notAuthenticated": true})
    })
  )
})