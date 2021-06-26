import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import getSubscriptionDetails from 'subscription/sdk/getSubscriptionDetails.js';
import controller from './[email].get.js';

const app = express();
app.get('/:newsletterId/:email', ...controller);

process.env.JWT_SECRET = 'test';
process.env.SUBSCRIPTION_URL = 'fetch-echo';

describe('GET /[newsletterId]/[email]', () => {
  it('calls subscription sdk getSubscriptionDetails', async () => {
    await request(app)
      .get(`/${'0'.repeat(24)}/Foo@bar.Buz?jwt=${jwt.sign({ sub: 'admin', iss: '0'.repeat(24) }, process.env.JWT_SECRET)}`)
      .then((res) => {
        expect(res.body).toEqual({ test: true });
      });
    expect(getSubscriptionDetails).toHaveBeenCalledWith({
      newsletterId: '0'.repeat(24),
      email: 'foo@bar.buz',
    });
  });

  it('errors if not allowed', () => request(app)
    .get(`/${'0'.repeat(24)}/foo@bar.buz?jwt=${jwt.sign({ sub: 'wrong' }, process.env.JWT_SECRET)}`)
    .then((res) => {
      expect(res.body).toEqual({
        error: {
          message: 'jwt issuer invalid. expected: 000000000000000000000000',
          name: 'JsonWebTokenError',
        },
      });
    }));
});
