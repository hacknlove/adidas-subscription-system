import fetchHelper from './fetchHelper.js';

export default function getAll({
  url,
  expiresIn,
  secret,
} = {}) {
  return fetchHelper({
    path: 'all',
    sub: 'admin',
    iss: 'none',
    url,
    secret,
    expiresIn,
  });
}
