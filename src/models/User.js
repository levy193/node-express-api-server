const mongoose = require('mongoose')
const generator = require('randomstring')
const passportLocalMongoose = require('passport-local-mongoose')

module.exports = dbConnection => {
  const schema = new mongoose.Schema({
    id: {
      type: String,
      unique: true,
      required: [true, 'ERR_USER_ID_REQUIRED']
    },

    username: {
      type: String,
      unique: true,
      required: [true, 'ERR_USER_NAME_REQUIRED']
    },

    displayName: {
      type: String,
      required: [true, 'ERR_USER_DISPLAY_NAME_REQUIRED'],
      index: true
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true,
      index: true
    },

    sid: String,

    lastLogin: Date
  }, {
    timestamp: true
  })

  schema.statics.generateSid = () => {
    return generator.generate(5)
  }

  schema.plugin(passportLocalMongoose, {
    usernameField: 'username',
    usernameUnique: true,
    lastLoginField: 'lastLogin',
    passwordValidator: (password, cb) => {
      if (!password || password.length < 6 || password.length > 30) {
        return cb(new Error('E_PASSWORD_INVALID'))
      }
      cb()
    },
    errorMessages: {
      MissingPasswordError: 'ERR_MISSING_PASSWORD',
      AttemptTooSoonError: 'ERR_ATTEMPT_TOO_SOON',
      TooManyAttemptsError: 'ERR_TOO_MANY_ATTEMPTS',
      NoSaltValueStoredError: 'ERR_NO_SALT_VALUE_STORED',
      IncorrectPasswordError: 'ERR_INCORRECT_USERNAME_OR_PASSWORD',
      IncorrectUsernameError: 'ERR_INCORRECT_USERNAME_OR_PASSWORD',
      MissingUsernameError: 'ERR_MISSING_USERNAME',
      UserExistsError: 'ERR_USER_EXIST'
    }
  })

  return dbConnection.model('User', schema)
}
