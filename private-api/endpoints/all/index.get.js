/**
 * @api {get} /all Get all subscriptions
 * @apiName getAllSubscriptions
 * @apiDescription Returns an array with all the subscriptions
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse Authorization
*/

import authentication from 'shared/authentication.js';
import validationFactory from 'shared/validation.js';
import { queryJWT } from 'shared/schemas.helper.js';
import getAll from 'subscription/sdk/getAll';

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
  async function all(req, res) {
    const subscriptions = await getAll();

    if (subscriptions.error) {
      return res.status(500).json({ error: subscriptions.error });
    }

    return res.status(200).json(subscriptions);
  },
];
