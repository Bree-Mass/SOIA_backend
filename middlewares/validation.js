const { celebrate, Joi } = require("celebrate");

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(16).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 16',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().hex().length(24),
  }),
});

module.exports.validateComment = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    comment: Joi.string().min(2).max(500).required().messages({
      "string.min": 'The minimum length of the "comment" field is 2',
      "string.max": 'The maximum length of the "comment" field is 500',
      "string.empty": 'The "comment" field must be filled in',
    }),
    page: Joi.number().integer().min(0).required().messages({
      "number.base": 'The "page" field must be a number',
      "number.integer": 'The "page" field must be an integer',
      "number.min": 'The "page" field must be at least 0',
      "number.max": 'The "page" field cannot be greater than 287',
    }),
  }),
});
