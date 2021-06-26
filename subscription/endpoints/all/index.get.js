/**
 * @api {get} /all Get all subscriptions
 * @apiName getAllSubscriptions
 * @apiDescription Returns an array with all the subscriptions
 * @apiGroup Subscription
 * @apiVersion 1.0.0
*/

import mongoProxy from 'shared/mongo.js';

export default async function allGet(req, res) {
  await mongoProxy.waitFor;

  const subscriptions = await mongoProxy.subscriptions.find({}, {
    projection: {
      email: 1,
      newsletterId: 1,
    },
  })
    .toArray()
    .catch((error) => ({ error }));

  if (subscriptions.error) {
    res.status(500);
  }

  res.json(subscriptions);
}
