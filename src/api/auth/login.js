const asyncHandler = require('express-async-handler')

const AuthService = require('@services/auth')

const middleware = []

module.exports = router => {
  router.post(
    '/login',
    middleware,
    asyncHandler(async (req, res, next) => {
      const accessToken = await AuthService.login(req.body.username, req.body.password)
      res.status(200).json({
        accessToken
      })
    })
  )
}
