/**
 * @api {get} /[newsletterId]/[email] Get subscription details
 * @apiName Subscription Details
 * @apiDescription Returns the details of one subscription
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse newsletterId
 * @apiUse email
 * @apiUse Authorization
*/

import authentication from 'shared/authentication.js';
import pipeFetchFactory from 'shared/pipeFetch.js';
import validationFactory from 'shared/validation.js';
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
  pipeFetchFactory(req => [`${process.env.SUBSCRIPTION_URL}/${req.params.newsletterId}/${req.params.email.toLowerCase()}`])
]

