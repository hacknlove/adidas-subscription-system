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
import validationFactory from 'shared/validation.js';
import { objectId, queryJWT } from 'shared/schemas.helper.js';
import getNewsletterSubscriptions from 'subscription/sdk/getNewsletterSubscriptions';

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
        newsletterId: objectId,
      },
    },
    query: queryJWT,
  },
};

export default [
  validationFactory(schema),
  authentication,
  async function newsletterSubscriptions(req, res) {
    const subscriptions = await getNewsletterSubscriptions({
      newsletterId: req.params.newsletterId,
    });

    if (subscriptions.error) {
      return res.status(500).json({ error: subscriptions.error });
    }

    return res.status(200).json(subscriptions);
  },
];
