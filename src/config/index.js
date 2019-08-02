const dotenv = require('dotenv')
const path = require('path')

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = process.env.NODE_ENV === 'production'

const env = dotenv.config({ path: isProd ? path.resolve('.env') : path.resolve('.env.dev') })

// Check .env file exist
if (!env) throw new Error("⚠️  Couldn't find .env file ⚠️")

module.exports = {
  /**
   * Application port
   */
  appPort: env.parsed.APP_PORT || 3000,

  /**
   * Application api prefix
   */
  appApiPrefix: '',

  /**
   * Base URL
   */
  baseURL: 'https://domainname.com',

  /**
   * Mongo connect URI
   */
  dbURI: env.parsed.MONGODB_URI,

  /**
   * Auth config
   */
  auth: {
    jwtSecret: env.parsed.JWT_SECRET,
    jwtExpire: '7d'
  },

  /**
   * Winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  }
}
