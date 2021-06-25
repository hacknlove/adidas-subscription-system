import Ajv from 'ajv';

const ajv = new Ajv();

function isNotEmpty (obj) {
  if (!obj) {
    return false
  }
  for(var i in obj) return true; 
  return false;
}

export default function validationFactory (schema) {
  return function validation (req, res, next) {
    const data = {}

    for( const key of ['body', 'params', 'query']) {
      if (isNotEmpty(req[key])) {
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