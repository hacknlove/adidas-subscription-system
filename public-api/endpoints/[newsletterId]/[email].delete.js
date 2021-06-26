/**
 * @api {delete} /[newsletterId]/[email] Cancel Subscriptiption
 * @apiName cancelSubscription
 * @apiDescription It checks the permisions, validate the parameters,
 * and send a request to the subscription service and pipes the response back
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse newsletterId
 * @apiUse email
 * @apiUse Authorization
*/

import validationFactory from 'shared/validation.js';
import authentication from 'shared/authentication.js';
import pipeFetchFactory from 'shared/pipeFetch.js';
import { newsletterId, email, queryJWT } from 'shared/schemas.helper.js';

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
        email,
      },
    },
    query: queryJWT,
  },
};

export default [
  validationFactory(schema),
  authentication,
  pipeFetchFactory((req) => [`${process.env.SUBSCRIPTION_URL}/${req.params.newsletterId}/${req.params.email}`, { method: 'DELETE' }]),
];
