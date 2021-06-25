import authentication from 'shared/authentication.js';
import pipeFetchFactory from 'shared/pipeFetch.js';
import validationFactory from 'shared/validation.js';

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
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
  pipeFetchFactory(() => [`${process.env.SUBSCRIPTION_URL}/all`])
];