import fetch from './fetchHelper.js';

export default function verifySubscription({
  url,
  email,
  newsletterId,
  token,
  firstName,
  gender,
  birthDate,
}) {
  return fetch({
    method: 'POST',
    url,
    path: `${newsletterId}/${email}/${token}`,
    data: {
      firstName,
      gender,
      birthDate,
    },
  });
}
