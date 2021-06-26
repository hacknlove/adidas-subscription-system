import mongoProxy, { ObjectId } from 'shared/mongo.js';

export default async function addSubscription(req, res) {
  const newsletterId = ObjectId(req.params.newsletterId);
  await mongoProxy.waitFor;

  const update = await mongoProxy.subscriptions.findOneAndUpdate({
    email: req.params.email,
  }, {
    $set: {
      ...req.body,
    },
    $addToSet: {
      newsletterId,
    },
  }, {
    upsert: true,
    projection: {
      _id: 1,
    },
  }).catch((error) => ({ error }));

  if (update.error || update.ok !== 1) {
    console.error(update.error ?? update.lastErrorObject);
    return res.status(500).json({
      internalError: true,
      error: update.error ?? update.lastErrorObject,
    });
  }

  res.status(200).json({ subscriptionId: update.value?._id ?? update.lastErrorObject.upserted });
}
