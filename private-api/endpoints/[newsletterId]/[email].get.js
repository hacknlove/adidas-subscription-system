import authentication from 'shared/authentication.js';
import pipeFetchFactory from 'shared/pipeFetch.js';
import { validationNewsletterEmail } from 'shared/schemas.helper.js'

export default [
  validationNewsletterEmail,
  authentication,
  pipeFetchFactory(req => [`${process.env.SUBSCRIPTION_URL}/${req.params.newsletterId}/${req.params.email.toLowerCase()}`])
]

