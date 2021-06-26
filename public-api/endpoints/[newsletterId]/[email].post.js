/**
 * @api {post} /[newsletterId]/[email] New Subscription
 * @apiName newSubscription
 * @apiDescription It checks the permissions, validates the parameters,
 * and sends a request to the subscription service and pipes the response back
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse newsletterId
 * @apiUse email
 * @apiParam (body) {string} [firstName] First name of the user
 * @apiParam (body) {string} [gender] Gender of the user
 *
 * * `"M"` -> male
 * * `"F"` -> female
 * * `"X"` -> other
 * @apiParam (body) {string} birthDate birth date of the user
 *
 * Any string that can be parsed by `new Date(birthDate)` will work
 * @apiParam (body) {boolen} [consent] Does the user consent? Only `true` is accepted
 */

import validationFactory from 'shared/validation.js';
import pipeFetchFactory from 'shared/pipeFetch.js';
import { newsletterId, email, queryJWT } from 'shared/schemas.helper.js';

const schema = {
  type: 'object',
  required: ['body', 'params'],
  additionalProperties: false,
  properties: {
    body: {
      type: 'object',
      required: ['birthDate', 'consent'],
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
        consent: {
          type: 'boolean',
          const: true,
        },
      },
    },
    params: {
      type: 'object',
      required: ['newsletterId', 'email'],
      additionalProperties: false,
      properties: {
        newsletterId,
        email,
      },
    },
    query: queryJWT,
  },
};

export default [
  validationFactory(schema),
  pipeFetchFactory((req) => [`${process.env.SUBSCRIPTION_URL}/${req.params.newsletterId}/${req.params.email.toLowerCase()}`, {
    method: 'POST',
    data: req.body,
  }]),
];
