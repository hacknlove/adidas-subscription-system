import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import cancelSubscription from 'subscription/sdk/cancelSubscription.js';
import controller from './[token].delete.js';

const app = express();
app.delete('/:newsletterId/:email/:token', ...controller);

process.env.JWT_SECRET = 'test';

describe('DELETE /[newsletterId]/[email]/[token]', () => {
  it('calls the subscription sdk to cancel the subscription', async () => {
    await request(app)
      .delete(`/${'0'.repeat(24)}/foo@bar.buz/${
        jwt.sign({ sub: 'foo@bar.buz', iss: '0'.repeat(24) }, process.env.JWT_SECRET)
      }`)
      .then((res) => {
        expect(res.body).toEqual({ canceled: true });
      });

    expect(cancelSubscription).toHaveBeenCalledWith('0'.repeat(24), 'foo@bar.buz');
  });

  it('errors if not allowed', async () => {
    await request(app)
      .delete(`/${'0'.repeat(24)}/foo@bar.buz/${
        jwt.sign({ sub: 'wrong' }, process.env.JWT_SECRET)
      }`)
      .then((res) => {
        expect(res.body).toEqual({
          error:
          {
            message: 'jwt issuer invalid. expected: 000000000000000000000000',
            name: 'JsonWebTokenError',
          },
        });
      });
    expect(cancelSubscription).not.toHaveBeenCalled();
  });
});
