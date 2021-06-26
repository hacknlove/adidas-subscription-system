import fetch from 'node-fetch';

export default function cancelSubscription(newsletterId, email) {
  return fetch(`${process.env.SUBSCRIPTION_URL}/${newsletterId}/${email}`, { method: 'DELETE' })
    .then((res) => res.json()).catch((error) => ({ error }));
}
