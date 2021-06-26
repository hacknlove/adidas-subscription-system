import fetch from 'node-fetch';

export default function getSubscriptionDetails({ newsletterId, email }) {
  return fetch(`${process.env.SUBSCRIPTION_URL}/${newsletterId}/${email}`)
    .then((res) => res.json()).catch((error) => ({ error }));
}
