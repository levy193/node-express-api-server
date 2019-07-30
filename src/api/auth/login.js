const asyncHandler = require('express-async-handler')

const mdw = []

module.exports = router => {
  router.post('/login', mdw, asyncHandler(async (req, res, next) => {
    res.status(200).json({})
  }))
}
