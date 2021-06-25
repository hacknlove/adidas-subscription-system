/**
 * @api {get} /[newsletterId]/[email] Verify Email
 * @apiName verifyEmail
 * @apiDescription This is the url that is linked on the verification email that is sent to every user to verify his email address
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse newsletterId
 * @apiUse email
 * @apiUse Authorization
*/

import validationFactory from 'shared/validation.js';
import authentication from 'shared/authentication.js';
import pipeFetchFactory from 'shared/pipeFetch.js';
import { newsletterId, email, queryJWT  } from 'shared/schemas.helper.js'

const schema = {
  type: 'object',
  required: ['params'],
  additionalProperties: false,
  properties: {
    params: {
      type: 'object',
      required: ['newsletterId', 'email'],
      additionalProperties: false,
      properties: {
        newsletterId,
        email
      }
    },
    query: queryJWT
  }
}

export default [
  validationFactory(schema),
  authentication,
  pipeFetchFactory(req => [`${process.env.SUBSCRIPTION_URL}/${req.params.newsletterId}/${req.params.email}/validate`, { method: 'POST' }])
]
