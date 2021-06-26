/**
 * @api {post} /[newsletterId]/[email]/[token] New Subscription
 * @apiName newSubscription
 * @apiDescription It checks the permissions, validates the parameters,
 * and sends a request to the subscription service and pipes the response back
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse newsletterId
 * @apiUse email
 * @apiUse token
 * @apiParam (body) {string} [firstName] First name of the user
 * @apiParam (body) {string} [gender] Gender of the user
 *
 * * `"M"` -> male
 * * `"F"` -> female
 * * `"X"` -> other
 * @apiParam (body) {string} birthDate birth date of the user
 *
 * Any string that can be parsed by `new Date(birthDate)` will work
 */

import validationFactory from 'shared/validation.js';
import {
  objectId, email, queryJWT, jwt,
} from 'shared/schemas.helper.js';
import createSubscription from 'subscription/sdk/createSubscription';
import authentication from 'shared/authentication.js';

const schema = {
  type: 'object',
  required: ['body', 'params'],
  additionalProperties: false,
  properties: {
    body: {
      type: 'object',
      required: ['birthDate'],
      additionalProperties: false,
      properties: {
        firstName: {
          type: 'string',
        },
        gender: {
          type: 'string',
          enum: ['M', 'F', 'X'],
        },
        birthDate: {
          type: 'string',
          format: 'date',
        },
      },
    },
    params: {
      type: 'object',
      required: ['newsletterId', 'email', 'token'],
      additionalProperties: false,
      properties: {
        newsletterId: objectId,
        email,
        token: jwt,
      },
    },
    query: queryJWT,
  },
};

export default [
  validationFactory(schema),
  authentication,
  async function create(req, res) {
    const result = await createSubscription({
      newsletterId: req.params.newsletterId,
      email: req.params.email.toLowerCase(),
      body: req.body,
    });

    if (result.error) {
      return res.status(500).json({ error: result.error });
    }

    return res.status(200).json({ subscriptionId: result.subscriptionId });
  },
];
