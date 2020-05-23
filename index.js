const Joi = require('@hapi/joi');
const Bourne = require('@hapi/bourne');

const joi = Joi.extend(
  joi => ({
    type: 'array',
    base: joi.array(),
    coerce: {
      from: 'string',
      method(value) {
        if (
          typeof value !== 'string' ||
          (!value.startsWith('[') && !/^\s*\[/.test(value))
        ) {
          return;
        }

        try {
          return { value: Bourne.parse(value) };
        } catch (ignoreErr) {
          // empty
        }
      },
    },
  }),
  joi => ({
    type: 'object',
    base: joi.object(),
    coerce: {
      from: 'string',
      method(value) {
        if (!value.startsWith('{') && !/^\s*\{/.test(value)) {
          return;
        }

        try {
          return { value: Bourne.parse(value) };
        } catch (ignoreErr) {
          // empty
        }
      },
    },
  }),
);

module.exports = joi;
