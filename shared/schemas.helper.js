import validationFactory from 'shared/validation.js';

const schemaNewsletterAndEmail = {
  type: 'object',
  required: ['params'],
  additionalProperties: false,
  properties: {
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
          // format: 'email' // Error: unknown format &quot;email&quot
          pattern: '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'// from https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address, while the format: 'email' bug is not fixed: 
        }
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

export const validationNewsletterEmail = validationFactory(schemaNewsletterAndEmail);