const express = require('express')
const loader = require('./loaders')
const config = require('./config')
const Logger = require('./utils/logger')

const appBoot = async () => {
  try {
    const app = express()

    await loader(app)

    await app.listen(config.appPort)
    Logger.info(`🛡️  Server listening on port: ${config.appPort}  🛡️`)
  } catch (err) {
    Logger.error('err')
    process.exit(0)
  }
}

appBoot(process.env.PORT || 3000)
