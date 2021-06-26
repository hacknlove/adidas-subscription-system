import mongoProxy, { ObjectId } from 'shared/mongo.js';

export default async function getSubscription(req, res) {
  await mongoProxy.waitFor;

  const subscription = await mongoProxy.subscriptions.findOne({
    newsletterId: ObjectId(req.params.newsletterId),
    email: req.params.email,
  }).catch((error) => ({ error }));

  if (!subscription) {
    return res.status(404).json({ error: 'not found' });
  }

  if (subscription.error) {
    return res.status(500).json({ error: subscription.error });
  }

  res.status(200).json(subscription);
}
