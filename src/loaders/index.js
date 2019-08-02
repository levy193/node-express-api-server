// Load alias
require('../utils/alias')()

const Logger = require('@utils/logger')
const mongodbLoader = require('./mongodb')
const vendorLoader = require('./vendor')
const passportLoader = require('./passport')
const serverLoader = require('./server')

module.exports = async app => {
  try {
    // Load mongodb
    const dbConnection = await mongodbLoader()
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
  } catch (err) {
    Logger.error('⚠️  Loader error  ️⚠️')
    Logger.error(err)
    console.error(err)
    throw err
  }
}
