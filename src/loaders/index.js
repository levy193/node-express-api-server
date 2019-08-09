// Load alias
require('../utils/alias')()

const Logger = require('@utils/logger')
const mongooseLoader = require('./mongoose')
const vendorLoader = require('./vendor')
const passportLoader = require('./passport')
const serverLoader = require('./server')

module.exports = async app => {
  // Load mongodb
  const dbConnection = await mongooseLoader()
  Logger.info('DB loaded and connected!  ✌️')

  // Load DIContainer
  vendorLoader(dbConnection)
  Logger.info('Dependencies Injector loaded! ️️ ✌️')

  // Passport loader
  passportLoader('User', dbConnection)
  Logger.info('Passport strategy loaded! ️️ ✌️')

  // Load express app
  serverLoader(app)
  Logger.info('Server loaded!  ✌️')
}
