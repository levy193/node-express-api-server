const express = require('express')
const loader = require('./loaders')
const config = require('./config')
const Logger = require('./utils/logger')

class Application {
  constructor() {
    this.PORT = config.appPort
    this.app = express()
  }

  async boot() {
    try {
      await loader(this.app)
      await this.app.listen(this.PORT)
      Logger.info(`🛡️  Server listening on port: ${config.appPort}  🛡️`)
    } catch (error) {
      console.log(error)
      process.exit(0)
    }
  }
}

module.exports = Application
