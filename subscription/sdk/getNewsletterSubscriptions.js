import fetch from 'node-fetch';

export default function getNewsletterSubscriptions({ newsletterId }) {
  return fetch(`${process.env.SUBSCRIPTION_URL}/${newsletterId}`)
    .then((res) => res.json()).catch((error) => ({ error }));
}
