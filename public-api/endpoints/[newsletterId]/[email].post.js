/**
 * @api {post} /[newsletterId]/[email] New Subscription
 * @apiName newSubscription
 * @apiDescription It validates the parameters and queues a verification email
 * @apiGroup Subscription
 * @apiVersion 1.0.0
 * @apiUse newsletterId
 * @apiUse email
 * @apiParam (body) {string} templateId
 * The id of the template that would be used to render the verification email
 * @apiParam (body) {string} [templateParams] extra parameter to be used by the email renderer
 * @apiParam (body) {string} [consent] It must be true
 */

import jwt from 'jsonwebtoken';

import validationFactory from 'shared/validation.js';
import { objectId, email } from 'shared/schemas.helper.js';
import existsSubscription from 'subscription/sdk/existsSubscription.js';
import queueEmail from 'mailer/sdk/queueEmail.js';

const schema = {
  type: 'object',
  required: ['body', 'params'],
  additionalProperties: false,
  properties: {
    body: {
      type: 'object',
      required: ['templateId', 'consent'],
      additionalProperties: false,
      properties: {
        templateId: objectId,
        templateParams: {
          type: 'object',
          additionalProperties: true,
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
        newsletterId: objectId,
        email,
      },
    },
  },
};

export default [
  validationFactory(schema),
  async function sendEmail(req, res) {
    const exists = await existsSubscription({
      newsletterId: req.params.newsletterId,
      email: req.params.email,
    });

    if (exists) {
      return res.status(200).json({ exists: true });
    }

    await queueEmail({
      email: req.params.email,
      templateId: req.body.templateId,
      templateParams: {
        ...req.body.templateParams,
        token: jwt.sign({ sub: req.params.email, expiresIn: '1d', iss: req.params.newsletterId }, process.env.JWT_SECRET),
      },
    });

    res.status(200).json({ sent: true });
  },
];
