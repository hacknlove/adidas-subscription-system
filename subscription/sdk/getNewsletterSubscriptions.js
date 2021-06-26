import fetch from 'node-fetch';

export default function getNewsletterSubscriptions({ newsletter }) {
  return fetch(`${process.env.SUBSCRIPTION_URL}/${newsletter}`)
    .then((res) => res.json()).catch((error) => ({ error }));
}
