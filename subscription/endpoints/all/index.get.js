/**
 * @api {get} /all Get all subscriptions
 * @apiName getAllSubscriptions
 * @apiDescription Returns an array with all the subscriptions
 *
 * The result is cached for CACHE_EXPIRY_MS miliseconds
 * Request to mongo are throttled by REVALIDATE_CACHE_MS milliseconds
 * @apiGroup Subscription
 * @apiVersion 1.0.0
*/

import mongoProxy from 'shared/mongo.js';
import cachedPromise from 'shared/cachedPromise.js';
import { expiry, revalidate } from 'subscription/config';

const getAllSubscriptions = cachedPromise(
  () => mongoProxy.waitFor
    .then(
      () => mongoProxy.subscriptions.find({}, {
        projection: {
          email: 1,
          newsletterId: 1,
        },
      }).toArray(),
    )
    .catch((error) => ({ error, $dontCache: true })),
  { expiry, revalidate },
);

export default async function allGet(req, res) {
  const subscriptions = await getAllSubscriptions();

  if (subscriptions.error) {
    res.status(500).json({ internalError: true, error: subscriptions.error });
    return;
  }

  res.status(200).json(subscriptions);
}
