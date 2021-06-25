import controller from './index.get.js';
import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.get('/', ...controller)

process.env.JWT_SECRET = 'test'
process.env.SUBSCRIPTION_URL = 'fetch-echo'

describe('get all subscriptions', () => {

  it('pipes to the right microservice and endpont', () => request(app)
    .get(`/?jwt=${jwt.sign({ sub: 'admin' }, process.env.JWT_SECRET)}`)
    .expect(200)
    .then(res => {
      expect(res.text).toBe('["fetch-echo/all",{}]')
    })
  )

  it('errors if not allowed', () => request(app)
    .get('/?jwt=bad')
    .expect(401)
    .then(res => {
      expect(res.body).toEqual({"error": {"message": "jwt malformed", "name": "JsonWebTokenError"}, "notAuthenticated": true})
    })
  )
})