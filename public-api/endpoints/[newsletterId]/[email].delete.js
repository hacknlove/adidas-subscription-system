import authentication from 'shared/authentication.js';
import { validationNewsletterEmail } from 'shared/schemas.helper.js'
import pipeFetchFactory from 'shared/pipeFetch.js';

export default [
  validationNewsletterEmail,
  authentication,
  pipeFetchFactory(req => [`${process.env.SUBSCRIPTION_URL}/${req.params.newsletterId}/${req.params.email}`, { method: 'DELETE' }])
]
