import validationFactory from 'shared/validation.js';
import pipeFetchFactory from 'shared/pipeFetch.js';

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
          type: 'string'
        },
        gender: {
          type: 'string',
          enum: ['M', 'F', 'X']
        },
        birthDate: {
          type: 'string',
          format: 'date'
        },
        consent: {
          type: "boolean",
          const: "true"
        },
      }
    },
    params: {
      type: 'object',
      required: ['newsletterId', 'email'],
      additionalProperties: false,
      properties: {
        newsletterId: {
          type: 'string',
          pattern: '^[0-9a-f]{24}$'
        },
        email: {
          type: 'string',
          format: 'email'
        }
      }
    }
  }
}

export default [
  validationFactory(schema),
  pipeFetchFactory(req => [`${process.env.SUBSCRIPTION_URL}/${req.params.newsletterId}/${req.params.email.toLowerCase()}`, {
    method: 'POST',
    data: req.body
  }])
]
