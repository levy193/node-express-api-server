const asyncHandler = require('express-async-handler')
const AuthService = require('@services/auth')

module.exports = router => {
  /**
   * Login router
   *
   */
  router.post(
    '/login',
    [],
    asyncHandler(async (req, res) => {
      const accessToken = await AuthService.login(req.body)
      res.status(200).json({
        accessToken
      })
    })
  )

  /**
   * Register
   */
  router.post(
    '/register',
    [],
    asyncHandler(async (req, res) => {
      const accessToken = await AuthService.register(req.body)
      res.status(200).json({
        accessToken
      })
    })
  )
}
