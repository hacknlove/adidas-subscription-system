import mongoProxy, { ObjectId } from 'shared/mongo.js';

export default async function addSubscription (req, res) {
  await mongoProxy.waitFor

  const update = await mongoProxy.subscriptions.updateOne({
    newsletterId: ObjectId(req.params.newsletterId),
    email: req.params.email
  }, {
    $set: {
      ...req.body
    }
  }, {
    upsert: true
  }).catch(error => ({ error }));

  if (update.error) {
    return res.status(500).json({ internalError: true, error: update.error })
  }

  res.status(200).json({
    matchedCount: update.matchedCount,
    modifiedCount: update.modifiedCount,
    upsertedCount: update.upsertedCount,
    upsertedId: update.upsertedId,
  })
}
