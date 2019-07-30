const mongoose = require('mongoose')
const bluebird = require('bluebird')
const config = require('../config')

module.exports = async () => {
  const production = process.env.NODE_ENV === 'production'

  // Mongoose options
  const options = {
    useNewUrlParser: true,
    autoIndex: !production,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
    promiseLibrary: bluebird,
    keepAlive: true
  }

  mongoose.set('debug', !production)
  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', false)
  mongoose.set('runValidators', true)

  const connection = await mongoose.createConnection(config.dbURI, options)

  return connection
}
