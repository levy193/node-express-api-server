const { pick } = require('lodash')
const diContainer = require('@utils/DiContainer')

class UserService {
  constructor() {
    this.User = diContainer.get('User')
  }

  getProfile(user) {
    return pick(user, [
      'uuid', 'username', 'displayName', 'email'
    ])
  }

  async changePassword(user, payload) {
    await user.changePassword(payload.currentPassword, payload.newPassword)

    // Delete current session id
    user.sid = undefined
    await user.save()
  }

  async logout(user) {
    user.sid = undefined
    await user.save()
  }
}

module.exports = new UserService()
