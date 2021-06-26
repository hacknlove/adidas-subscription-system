/**
 * @api {get} /all Get all subscriptions
 * @apiName getAllSubscriptions
 * @apiDescription Returns an array with all the subscriptions
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse Authorization
*/

import authentication from 'shared/authentication.js';
import pipeFetchFactory from 'shared/pipeFetch.js';
import validationFactory from 'shared/validation.js';
import { queryJWT } from 'shared/schemas.helper.js';

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    query: queryJWT,
  },
};
export default [
  validationFactory(schema),
  authentication,
  pipeFetchFactory(() => [`${process.env.SUBSCRIPTION_URL}/all`]),
];
