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
import validationFactory from 'shared/validation.js';
import { objectId, email, queryJWT } from 'shared/schemas.helper.js';
import getSubscriptionDetails from 'subscription/sdk/getSubscriptionDetails.js';

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
        newsletterId: objectId,
        email,
      },
    },
    query: queryJWT,
  },
};

export default [
  validationFactory(schema),
  authentication,
  async function subscriptionDetails(req, res) {
    const subscription = await getSubscriptionDetails({
      newsletterId: req.params.newsletterId,
      email: req.params.email.toLowerCase(),
    });

    if (!subscription) {
      return res.status(404).json({ notFound: true });
    }

    if (subscription.error) {
      return res.status(500).json({ error: subscription.error });
    }

    return res.status(200).json(subscription);
  },
];
