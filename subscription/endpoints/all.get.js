import mongoProxy from 'shared/mongo.js';
import cachedPromise from 'shared/cachedPromise.js';

const getAllSubscriptions = cachedPromise(
  async () => {
    await mongoProxy.waitFor;

    return mongoProxy.subscriptions.find().toArray().catch(error => ({ error, $dontCache: true }))
  },
  {
    expiry: 6000,
  }
);

export default async function allGet (req, res) {
  const subscriptions = await getAllSubscriptions()

  if (subscriptions.error) {
    res.status(500).json({ internalError: true, error })
    return
  }

  res.status(200).json(subscriptions)
}