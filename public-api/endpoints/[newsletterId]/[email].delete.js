import authentication from 'public/lib/authentication.js';
import { validationNewsletterEmail } from './schemas.helper.js'
import pipeFetchFactory from 'shared/pipeFetch.js';

export default [
  validationNewsletterEmail,
  authentication,
  pipeFetchFactory(req => [`${process.env.SUBSCRIPTION_URL}/${req.params.newsletterId}/${req.params.email}`, { method: 'DELETE' }])
]
