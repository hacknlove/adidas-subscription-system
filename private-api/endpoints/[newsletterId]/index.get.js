/**
 * @api {get} /[newsletterId] Get subscriptions for one newsletter
 * @apiName getNewsletterSubscriptions
 * @apiDescription Returns an array with the subscriptions of the expecified newsletter
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse newsletterId
 * @apiUse Authorization
*/

import authentication from 'shared/authentication.js';
import pipeFetchFactory from 'shared/pipeFetch.js';
import validationFactory from 'shared/validation.js';
import { newsletterId, queryJWT  } from 'shared/schemas.helper.js'

const schema = {
  type: 'object',
  required: ['params'],
  additionalProperties: false,
  properties: {
    params: {
      type: 'object',
      required: ['newsletterId'],
      additionalProperties: false,
      properties: {
        newsletterId
      }
    },
    query: queryJWT
  }
}

export default [
  validationFactory(schema),
  authentication,
  pipeFetchFactory(req => [`${process.env.SUBSCRIPTION_URL}/${req.params.newsletterId}`])
]

