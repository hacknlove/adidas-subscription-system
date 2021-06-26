export const objectId = {
  type: 'string',
  pattern: '^[0-9a-f]{24}$',
};

export const email = {
  type: 'string',
  format: 'email',
};

export const jwt = {
  type: 'string',
};

export const queryJWT = {
  type: 'object',
  additionalProperties: false,
  properties: {
    jwt,
  },
};
