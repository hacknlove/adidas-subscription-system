import authentication from 'shared/authentication.js';
import pipeFetchFactory from 'shared/pipeFetch.js';
import validationFactory from 'shared/validation.js';

const schema = {
  type: 'object',
  required: ['params'],
  additionalProperties: false,
  properties: {
    params: {
      type: 'object',
      required: ['newsletterId'],
      additionalProperties: false,
      properties: {
        newsletterId: {
          type: 'string',
          pattern: '^[0-9a-f]{24}$'
        },
      }
    },
    query: {
      type: 'object',
      additionalProperties: false,
      properties: {
        jwt: {
          type: 'string'
        }
      }
    }
  }
}

export default [
  validationFactory(schema),
  authentication,
  pipeFetchFactory(req => [`${process.env.SUBSCRIPTION_URL}/${req.params.newsletterId}`])
]

