/**
 * @api {get} /[newsletterId] Get subscriptions for one newsletter
 * @apiName getNewsletterSubscriptions
 * @apiDescription Returns an array with the subscriptions of the expecified newsletter
 * 
 * The result is cached for CACHE_EXPIRY_MS miliseconds
 * Request to mongo are throttled by REVALIDATE_CACHE_MS milliseconds
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse newsletterId
*/

import mongoProxy, { ObjectId } from 'shared/mongo.js';
import cachedPromise from 'shared/cachedPromise.js';

const getNewsletterSubscriptionsCached = cachedPromise(
  async (newsletterId) => {
    await mongoProxy.waitFor;

    const response = (await mongoProxy.subscriptions.find({
      newsletterId: ObjectId(newsletterId),
    }, { projection: { _id: 1 }}).toArray().catch(error => ({ error, $dontCache: true })))

    if (response.error) {
      return response
    }

    return response.map(({ _id }) => _id)
  },
  {
    expiry: 6000,
  }
);

export default async function getNewsletterSubscriptions (req, res) {
  const subscriptions = await getNewsletterSubscriptionsCached(req.params.newsletterId);

  if (subscriptions.error) {
    return res.status(500).json({ internalError: true, error: update.error })
  }

  res.status(200).json(subscriptions)
}