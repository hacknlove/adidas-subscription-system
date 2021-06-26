import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
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
      firstName: 'john',
      birthDate: '1970-01-01',
      gender: 'M',
    })
    .then((res) => {
      expect(true).toBe(true);
      expect(res.body.validationError).toBe(true);
    }));

  it('pipes the request to the right microservice and endpont', () => request(app)
    .post(`/${'0'.repeat(24)}/foo@bar.buz?jwt=${jwt.sign({ sub: 'foo@bar.buz' }, process.env.JWT_SECRET)}`)
    .send({
      firstName: 'john',
      birthDate: '1970-01-01',
      consent: true,
      gender: 'M',
    })
    .then((res) => {
      const [url, options] = JSON.parse(res.text);
      expect(url).toBe('fetch-echo/000000000000000000000000/foo@bar.buz');
      expect(options.method).toBe('POST');
      expect(JSON.parse(options.body)).toEqual({
        firstName: 'john',
        birthDate: '1970-01-01',
        consent: true,
        gender: 'M',
      });
    }));
});
