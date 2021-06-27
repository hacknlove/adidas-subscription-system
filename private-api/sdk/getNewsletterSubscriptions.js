import fetchHelper from './fetchHelper.js';

export default function getSubscription({
  newsletterId,
  url,
  expiresIn,
}) {
  return fetchHelper({
    path: `${newsletterId}`,
    sub: 'admin',
    iss: newsletterId,
    url,
    expiresIn,
  });
}
