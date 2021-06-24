import mongoProxy from 'shared/mongo.js';

export default async function getSubscription (req, res) {
  await mongoProxy.waitFor

  const result = await mongoProxy.subscriptions.deleteOne({
    newsletterId: ObjectId(req.params.newsletterId),
    email: req.params.email
  }).catch(error => ({ error }));

  if (update.error) {
    return res.status(500).json({ internalError: true, error: update.error })
  }

  res.status(200).json({ deletedCount: result.deletedCount })
}