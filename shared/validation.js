/* eslint-disable no-restricted-syntax */
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

function isNotEmpty(obj) {
  if (!obj) {
    return false;
  }
  // eslint-disable-next-line guard-for-in
  for (const i in obj) return true;
  return false;
}

export default function validationFactory(schema) {
  return function validation(req, res, next) {
    const data = {};

    for (const key of ['body', 'params', 'query']) {
      if (isNotEmpty(req[key])) {
        data[key] = req[key];
      }
    }

    const valid = ajv.validate(schema, data);

    if (!valid) {
      return res.status(400).json({
        validationError: true,
        error: ajv.errors,
      });
    }
    next();
  };
}
