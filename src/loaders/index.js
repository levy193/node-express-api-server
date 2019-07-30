// Load alias
require('../utils/alias')()

const Logger = require('@utils/logger')
const mongodbLoader = require('./mongodb')
const vendorLoader = require('./vendor').init
const expressLoader = require('./express')

module.exports = async app => {
  try {
    // Load mongodb
    const dbConnection = await mongodbLoader()
    Logger.info('✌️  DB loaded and connected!  ✌️')

    // Load DIContainer
    vendorLoader(dbConnection, Logger)
    Logger.info('✌️  Dependencies Injector loaded! ️️ ✌️')

    // Load express app
    expressLoader(app)
    Logger.info('✌️  Express application loaded!  ✌️')
  } catch (err) {
    Logger.error('⚠️  Loader error  ️⚠️')
    throw err
  }
}
