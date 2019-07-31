const jwt = require('jsonwebtoken')
const diContainer = require('@utils/di-container')

class AuthService {
  constructor() {
    const config = diContainer.get('config')
    this.jwtSecret = config.auth.jwtSecret
    this.jwtExpire = config.auth.jwtExpire
    this.User = diContainer.get('User')
  }

  generateJwt(payload) {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpire
    })
  }

  async login(username, password) {
    const { user } = await this.User.authenticate()(username, password)

    if (!user) throw new Error('ERR_USERNAME_OR_PASSWORD')

    user.sid = this.User.generateSid()
    await user.save()

    return this.generateJwt({
      uid: user._id,
      sid: user.sid
    })
  }
}

const authService = new AuthService()

module.exports = authService
