/**
 * @api {post} /[newsletterId]/[email] New Subscription
 * @apiName newSubscription
 * @apiDescription It $addToSet the newsletterId to the subscription, upserting if needed
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse newsletterId
 * @apiUse email
 * @apiParam (body) {string} firstName First name of the user
 * @apiParam (body) {string} gender Gender of the user
 *
 * * `"M"` -> male
 * * `"F"` -> female
 * * `"X"` -> other
 * @apiParam (body) {string} birthDate birth date of the user
 *
 * Any string that can be parsed by `new Date(birthDate)` will work
 * @apiParam (body) {boolen} [consent] Does the user consent? Only `true` is accepted
 */

import mongoProxy, { ObjectId } from 'shared/mongo.js';

export default async function addSubscription(req, res) {
  const newsletterId = ObjectId(req.params.newsletterId);
  await mongoProxy.waitFor;

  const $set = { ...req.body };
  if ($set.birthDate) {
    $set.birthDate = new Date($set.birthDate);
  }

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
