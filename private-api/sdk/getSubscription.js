import fetchHelper from './fetchHelper.js';

export default function getSubscription({
  newsletterId,
  email,
  url,
  expiresIn,
}) {
  return fetchHelper({
    path: `${newsletterId}/${email}`,
    sub: email,
    iss: newsletterId,
    url,
    expiresIn,
  });
}
