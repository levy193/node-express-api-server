const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
  uuid: Joi.string(),
  username: Joi.string().min(4).max(20),
  displayName: Joi.string().min(3).max(20),
  email: Joi.string().email()
})

module.exports = schema
