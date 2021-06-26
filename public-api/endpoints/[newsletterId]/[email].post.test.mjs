import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import queueEmail from 'mailer/sdk/queueEmail';
import controller from './[email].post.js';

const app = express();
app.post('/:newsletterId/:email', express.json());
app.post('/:newsletterId/:email', ...controller);

process.env.JWT_SECRET = 'test';
process.env.SUBSCRIPTION_URL = 'fetch-echo';

describe('POST /[newsletterId]/[email]', () => {
  it('errors if missing consent', () => request(app)
    .post(`/${'0'.repeat(24)}/foo@bar.buz?jwt=${jwt.sign({ sub: 'foo@bar.buz' }, process.env.JWT_SECRET)}`)
    .send({
      templateId: '1'.repeat(24),
      consent: false,
    })
    .then((res) => {
      expect(true).toBe(true);
      expect(res.body.validationError).toBe(true);
    }));

  it('pipes the request to the right microservice and endpont', async () => {
    await request(app)
      .post(`/${'0'.repeat(24)}/foo@bar.buz`)
      .send({
        templateId: '1'.repeat(24),
        consent: true,
        templateParams: {
          foo: true,
        },
      })
      .then((res) => {
        expect(res.body).toEqual({ sent: true });
      });
    expect(queueEmail).toHaveBeenCalled();

    expect(queueEmail.mock.calls[0][0]).toHaveProperty('templateParams.token');
  });
});
