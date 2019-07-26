const diContainer = require('@utils/DIContainer')

const asyncMdw = diContainer.get('async-handler')

const mdw = []

module.exports = router => {
  router.post('/', mdw, asyncMdw(async (req, res, next) => {
  }))
}
