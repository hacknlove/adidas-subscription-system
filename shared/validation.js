import Ajv from 'ajv';

export default function validationFactory (schema) {
  return function validation (req, res, next) {
    const data = {}

    for( const key of ['body', 'params', 'query']) {
      if (req[key] !== undefined) {
        data[key] = req[key]
      }
    }

    const valid = ajv.validate(schema, data)

    if (!valid) {
      res.status(400).json({
        validationError: true,
        error: ajv.errors
      })
    }
    next()
  }
}