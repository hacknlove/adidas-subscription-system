import authentication from 'public/lib/authentication.js';
import pipeFetchFactory from 'shared/pipeFetch.js';
import { validationNewsletterEmail } from './schemas.helper.js'

export default [
  validationNewsletterEmail,
  authentication,
  pipeFetchFactory(req => [`${process.env.SUBSCRIPTION_URL}/${req.params.newsletterId}/${req.params.email}`])
]

