export const newsletterId = {
  type: 'string',
  pattern: '^[0-9a-f]{24}$'
}

export const email = {
  type: 'string',
  format: 'email' 
}

export const queryJWT = {
  type: 'object',
  additionalProperties: false,
  properties: {
    jwt: {
      type: 'string'
    }
  }
}
