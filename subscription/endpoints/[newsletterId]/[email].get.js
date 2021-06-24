import mongoProxy from 'shared/mongo.js';

const getSubscriptionsCached = cachedPromise(
  async (newsletterId, email) => {
    await mongoProxy.waitFor;

    return await mongoProxy.subscriptions.findOne({
      newsletterId: ObjectId(newsletterId),
      email
    }).catch(error => ({ error, $dontCache: true }));
  },
  {
    expiry: 6000,
  }
);

export default async function getSubscription (req, res) {
  const subscription = await getSubscriptionsCached(ObjectId(req.params.newsletterId), req.params.email);

  if (update.error) {
    return res.status(500).json({ internalError: true, error: update.error })
  }

  res.status(200).json(subscription)
}