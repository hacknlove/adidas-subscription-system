import { expect, jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import authentication from './authentication.js';

describe('authentication', () => {
  it('call next if the token is valid', async () => {
    const newsletterId = 'newsletter';
    const email = 'email';
    process.env.JWT_SECRET = 'secret';

    const token = jwt.sign({ sub: email, iss: newsletterId }, process.env.JWT_SECRET);

    const resMock = {
      status: jest.fn(() => resMock),
      json: jest.fn(() => resMock),
    };

    await new Promise((next) => {
      authentication({ params: { token, newsletterId, email } }, resMock, next);
    });

    expect(resMock.status).not.toHaveBeenCalled();
    expect(resMock.json).not.toHaveBeenCalled();
  });

  it('return 401 if the token is not valid', async () => {
    const newsletterId = 'newsletter';
    const email = 'email';
    process.env.JWT_SECRET = 'secret';

    const token = jwt.sign({ sub: 'wrong', iss: newsletterId }, process.env.JWT_SECRET);
    const next = jest.fn();

    await new Promise((resolve) => {
      authentication(
        { params: { token, newsletterId, email } },
        { status: () => ({ json: resolve }) }, next,
      );
    });

    expect(next).not.toHaveBeenCalled();
  });
});
