const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
  uuid: Joi.string().required(),
  username: Joi.string().required().min(4).max(20),
  displayName: Joi.string().required().min(3).max(20),
  email: Joi.string().required().email()
})

module.exports = schema
