import fetch from './fetchHelper.js';

export default function subscribeToNewsletter({
  url,
  email,
  newsletterId,
  consent,
  templateId,
  templateParams,
}) {
  return fetch({
    method: 'POST',
    url,
    path: `${newsletterId}/${email}`,
    data: {
      consent,
      templateId,
      templateParams,
    },
  });
}
