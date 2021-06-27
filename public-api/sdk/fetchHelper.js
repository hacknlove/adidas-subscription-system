/* globals fetch */

export default async function fetchHelper({
  path,
  url = process.env.SUBSCRIPTION_PUBLIC_API_URL,
  method = 'GET',
  data,
}) {
  const options = {
    method,
  };
  if (data) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(data);
  }

  return fetch(`${url}/${path}`, options)
    .then((r) => r.json())
    .catch((error) => ({ error }));
}
