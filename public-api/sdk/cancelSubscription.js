import fetch from './fetchHelper.js';

export default function cancelSubscription({
  url,
  email,
  newsletterId,
  token,
}) {
  return fetch({
    method: 'DELETE',
    url,
    path: `${newsletterId}/${email}/${token}`,
  });
}
