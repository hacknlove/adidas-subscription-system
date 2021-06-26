import fetch from 'node-fetch';

export default function getAll() {
  return fetch(`${process.env.SUBSCRIPTION_URL}/all`)
    .then((res) => res.json()).catch((error) => ({ error }));
}
