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
          format: 'email'
        }
      }
    }
  }
}

export const validationNewsletterEmail = validationFactory(schemaNewsletterAndEmail);