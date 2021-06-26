import fetch from 'node-fetch';

export default async function existsSubscription(newsletterId, email) {
  const response = await fetch(`${process.env.SUBSCRIPTION_URL}/${email}/${newsletterId}`)
    .then((res) => res.json()).catch((error) => null({ error }));

  if (!response) {
    return false;
  }

  if (response.error) {
    if (response.error === 'not found') {
      return false;
    }
    console.error(response.error);
  }

  return true;
}
