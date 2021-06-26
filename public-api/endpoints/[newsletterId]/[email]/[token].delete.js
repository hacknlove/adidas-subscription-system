/**
 * @api {delete} /[newsletterId]/[email]/[token] Cancel Subscriptiption
 * @apiName cancelSubscription
 * @apiDescription It checks the permisions, validate the parameters, and cancels a subscription
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse newsletterId
 * @apiUse email
 * @apiUse token
*/

import validationFactory from 'shared/validation.js';
import authentication from 'shared/authentication.js';
import {
  objectId, email, queryJWT, jwt,
} from 'shared/schemas.helper.js';
import cancelSubscription from 'subscription/sdk/cancelSubscription';

const schema = {
  type: 'object',
  required: ['params'],
  additionalProperties: false,
  properties: {
    params: {
      type: 'object',
      required: ['newsletterId', 'email', 'token'],
      additionalProperties: false,
      properties: {
        newsletterId: objectId,
        email,
        token: jwt,
      },
    },
    query: queryJWT,
  },
};

export default [
  validationFactory(schema),
  authentication,
  async function cancel(req, res) {
    const result = await cancelSubscription(
      req.params.newsletterId,
      req.params.email.toLowerCase(),
    );

    if (result.error) {
      return res.status(500).json({ error: result.error });
    }

    res.status(200).json({ canceled: true });
  },
];
