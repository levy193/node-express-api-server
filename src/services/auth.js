const jwt = require('jsonwebtoken')
const diContainer = require('@utils/DiContainer')

class AuthService {
  constructor() {
    const config = diContainer.get('config')
    this.jwtSecret = config.auth.jwtSecret
    this.jwtExpire = config.auth.jwtExpire

    this.User = diContainer.get('User')
    this.validators = diContainer.get('validators')
  }

  // Generate JWT with secret key and set expire time
  generateJwt(payload) {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpire
    })
  }

  async login(payload) {
    const { user } = await this.User.authenticate()(payload.username, payload.password)

    if (!user) throw new Error('ERR_USERNAME_OR_PASSWORD')

    user.sid = this.User.generateSid()
    await user.save()

    return this.generateJwt({
      uid: user._id,
      sid: user.sid
    })
  }

  async register(payload) {
    let user = {}

    // Create new user
    user = new this.User(payload)
    user.uuid = this.User.generateUuid(payload.username)
    user.sid = this.User.generateSid()
    await user.setPassword(payload.password)
    user = await user.save()

    return this.generateJwt({
      uid: user._id,
      sid: user.sid
    })
  }
}

module.exports = new AuthService()
