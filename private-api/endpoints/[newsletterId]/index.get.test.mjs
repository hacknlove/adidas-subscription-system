import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import getNewsletterSubscriptions from 'subscription/sdk/getNewsletterSubscriptions';
import controller from './index.get.js';

const app = express();
app.get('/:newsletterId', ...controller);

process.env.JWT_SECRET = 'test';
process.env.SUBSCRIPTION_URL = 'fetch-echo';

describe('GET /[newsletterId]/[email]', () => {
  it('calls subscription sdk getNewsletterSubscriptions', async () => {
    await request(app)
      .get(`/${'0'.repeat(24)}?jwt=${jwt.sign({ sub: 'admin', iss: '0'.repeat(24) }, process.env.JWT_SECRET)}`)
      .then((res) => {
        expect(res.body).toEqual([{ test: true }]);
      });

    expect(getNewsletterSubscriptions).toHaveBeenCalledWith({ newsletterId: '0'.repeat(24) });
  });

  it('errors if not allowed', () => request(app)
    .get(`/${'0'.repeat(24)}?jwt=${jwt.sign({ sub: 'wrong' }, process.env.JWT_SECRET)}`)
    .then((res) => {
      expect(res.body).toEqual({
        error: {
          message: 'jwt issuer invalid. expected: 000000000000000000000000',
          name: 'JsonWebTokenError',
        },
      });
    }));
});
