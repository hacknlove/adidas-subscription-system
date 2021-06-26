import mongoProxy, { ObjectId } from 'shared/mongo.js';

export default async function getSubscription(req, res) {
  await mongoProxy.waitFor;

  const result = await mongoProxy.subscriptions.deleteOne({
    newsletterId: ObjectId(req.params.newsletterId),
    email: req.params.email,
  }).catch((error) => ({ error }));

  if (result.error) {
    return res.status(500).json({ internalError: true, error: result.error });
  }

  res.status(200).json({ deletedCount: result.deletedCount });
}
