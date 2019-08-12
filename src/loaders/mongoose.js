const mongoose = require('mongoose')
const promise = require('bluebird')
const path = require('path')
const glob = require('glob')
const config = require('@config')

module.exports = async () => {
  const isProd = process.env.NODE_ENV === 'production'
  const isDev = process.env.NODE_ENV === 'development'

  // Mongoose options
  const options = {
    useNewUrlParser: true,
    autoIndex: !isProd,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
    promiseLibrary: promise,
    keepAlive: true
  }

  mongoose.set('debug', isDev)
  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', false)
  mongoose.set('runValidators', true)

  const connection = await mongoose.createConnection(config.dbURI, options)

  // Sync indexes
  const modelsPaths = glob.sync(path.resolve('./src/models/*.js'))
  await promise.all(modelsPaths.map(modelPath => {
    const model = require(modelPath)(connection)
    return model.syncIndexes()
  }))

  return connection
}
