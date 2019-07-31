// Load alias
require('../utils/alias')()

const Logger = require('@utils/logger')
const mongodbLoader = require('./mongodb')
const vendorLoader = require('./vendor')
const serverLoader = require('./server')

module.exports = async app => {
  try {
    // Load mongodb
    const dbConnection = await mongodbLoader()
    Logger.info('✌️  DB loaded and connected!  ✌️')

    // Load DIContainer
    vendorLoader(dbConnection)
    Logger.info('✌️  Dependencies Injector loaded! ️️ ✌️')

    // Load express app
    serverLoader(app)
    Logger.info('✌️  Express application loaded!  ✌️')
  } catch (err) {
    Logger.error('⚠️  Loader error  ️⚠️')
    throw err
  }
}
