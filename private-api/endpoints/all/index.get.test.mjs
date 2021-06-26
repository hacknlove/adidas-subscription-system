import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import getAll from 'subscription/sdk/getAll.js';
import controller from './index.get.js';

const app = express();
app.get('/', ...controller);

process.env.JWT_SECRET = 'test';
process.env.SUBSCRIPTION_URL = 'fetch-echo';

describe('GET /all', () => {
  it('calls subscription sdk getAll', async () => {
    await request(app)
      .get(`/?jwt=${jwt.sign({ sub: 'admin', iss: 'none' }, process.env.JWT_SECRET)}`)
      .then((res) => {
        expect(res.body).toEqual([{ test: true }]);
      });

    expect(getAll).toHaveBeenCalledWith();
  });

  it('errors if not allowed', () => request(app)
    .get('/?jwt=bad')
    .then((res) => {
      expect(res.body).toEqual({ error: { message: 'jwt malformed', name: 'JsonWebTokenError' } });
    }));
});
