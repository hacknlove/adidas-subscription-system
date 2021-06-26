import mongoProxy, { ObjectId } from 'shared/mongo.js';

export default async function getSubscription(req, res) {
  await mongoProxy.waitFor;

  const update = await mongoProxy.subscriptions.findOneAndUpdate({
    email: req.params.email,
  }, {
    $pull: {
      newsletterId: ObjectId(req.params.newsletterId),
    },
  }, {
    projection: {
      newsletterId: 1,
    },
    returnDocument: 'after',
  }).catch((error) => ({ error }));

  if (update.error) {
    return res.status(500).json({ internalError: true, error: update.error });
  }

  if (update.value?.newsletterId?.length === 0) {
    await mongoProxy.subscriptions.deleteOne({ _id: update.value._id });
  }

  res.status(200).json({ ok: true });
}
