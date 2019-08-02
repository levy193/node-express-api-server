const path = require('path')
const glob = require('glob')

const diContainer = require('@utils/DiContainer')
const Logger = require('@utils/logger')
const config = require('../config')

module.exports = (dbConnection) => {
  // Dependencies
  diContainer.register('logger', Logger)
  diContainer.register('dbConnection', dbConnection)
  diContainer.register('config', config)

  // Factory

  // Add all models to DIContainer
  const modelsPaths = glob.sync(path.resolve('./src/models/*.js'))
  modelsPaths.forEach(modelPath => {
    const model = modelPath.split('/').pop().split('.').shift()
    diContainer.register(model, require(modelPath)(dbConnection))
  })
}
