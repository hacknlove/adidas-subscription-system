import fetch from 'node-fetch';

export default async function createSubscription({ newsletterId, email, body }) {
  return fetch(`${process.env.SUBSCRIPTION_URL}/${newsletterId}/${email}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json()).catch((error) => ({ error }));
}
