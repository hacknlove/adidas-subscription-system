import mongoProxy from 'shared/mongo.js';
import cachedPromise from 'shared/cachedPromise.js';

const getNewsletterSubscriptionsCached = cachedPromise(
  async (newsletterId) => {
    await mongoProxy.waitFor;

    return await mongoProxy.subscriptions.find({
      newsletterId: ObjectId(newsletterId),
    }).toArray().catch(error => ({ error, $dontCache: true }))
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