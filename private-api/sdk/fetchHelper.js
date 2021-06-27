import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

export default function fetchHelper({
  path,
  url = process.env.SUBSCRIPTION_PRIVATE_API_URL,
  sub = 'admin',
  iss = 'none',
  expiresIn = process.env.JWT_expiresIN ?? '1h',
  secret = process.env.JWT_SECRET,
}) {
  return fetch(`${url}/${path}?jwt=${jwt.sign({ sub, iss, expiresIn }, secret)}`)
    .then((r) => r.json())
    .catch((error) => ({ error }));
}
