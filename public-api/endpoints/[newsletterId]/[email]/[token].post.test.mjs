import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import createSubscription from 'subscription/sdk/createSubscription';
import controller from './[token].post.js';

const app = express();
app.post('/:newsletterId/:email/:token', express.json());
app.post('/:newsletterId/:email/:token', ...controller);

process.env.JWT_SECRET = 'test';

describe('POST /[newsletterId]/[email]/[token]', () => {
  it('calls the subscription sdk to create a subscription', async () => {
    createSubscription.mockReturnValueOnce(Promise.resolve({ subscriptionId: '1'.repeat(24) }));
    return request(app)
      .post(`/${'0'.repeat(24)}/foo@bar.buz/${jwt.sign({ sub: 'foo@bar.buz', iss: '0'.repeat(24) }, process.env.JWT_SECRET)}`)
      .send({
        firstName: 'john',
        birthDate: '1970-01-01',
        gender: 'M',
      })
      .then((res) => {
        expect(res.body).toEqual({ subscriptionId: '1'.repeat(24) });

        expect(createSubscription).toHaveBeenCalledWith({
          email: 'foo@bar.buz',
          newsletterId: '0'.repeat(24),
          body: {
            firstName: 'john',
            birthDate: '1970-01-01',
            gender: 'M',
          },
        });
      });
  });
});
