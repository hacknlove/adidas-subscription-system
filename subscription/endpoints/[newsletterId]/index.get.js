/**
 * @api {get} /[newsletterId] Get subscriptions for one newsletter
 * @apiName getNewsletterSubscriptions
 * @apiDescription Returns an array with the subscriptions of the expecified newsletter
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse newsletterId
*/

import mongoProxy, { ObjectId } from 'shared/mongo.js';

export default async function getNewsletterSubscriptions(req, res) {
  await mongoProxy.waitFor;

  const subscriptions = await mongoProxy.subscriptions.find({
    newsletterId: ObjectId(req.params.newsletterId),
  }, { projection: { newsletterId: 0 } })
    .toArray()
    .catch((error) => ({ error }));

  if (subscriptions.error) {
    return res.status(500);
  }

  res.status(200).json(subscriptions);
}
