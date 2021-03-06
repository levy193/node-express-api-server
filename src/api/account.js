const asyncHandler = require('express-async-handler')

const userService = require('@services/user')

module.exports = router => {
  /**
   * Get profile
   */
  router.get(
    '/',
    [],
    asyncHandler(async (req, res) => {
      res.status(200).json({
        profile: userService.getProfile(req.user)
      })
    })
  )

  /**
   * Change password
   */
  router.post(
    '/change-password',
    [],
    asyncHandler(async (req, res) => {
      await userService.changePassword(req.user, req.body)
      res.status(200).json({
        msg: res.__('MSG_PASSWORD_CHANGE_SUCCESS')
      })
    })
  )

  /**
   * Logout
   */
  router.post(
    '/logout',
    [],
    asyncHandler(async (req, res) => {
      await userService.logout(req.user)
      res.status(200).json({
        msg: res.__('MSG_LOGOUT_SUCCESS')
      })
    })
  )
}
