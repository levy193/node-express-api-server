const path = require('path')
const glob = require('glob')

const DIContainer = require('@utils/di-container')
const Logger = require('@utils/logger')

const diContainer = new DIContainer()

module.exports = diContainer

module.exports.init = (dbConnection) => {
  // Dependencies
  diContainer.register('logger', Logger)
  diContainer.register('dbConnection', dbConnection)

  // Factory

  // Add all models to DIContainer
  const modelsPaths = glob.sync(path.resolve('./src/models/*.js'))
  modelsPaths.forEach(modelPath => {
    const model = modelPath.split('/').pop().split('.').shift()
    diContainer.factory(model, require(modelPath))
  })
}
