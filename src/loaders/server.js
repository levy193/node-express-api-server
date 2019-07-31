const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const i18n = require('i18n')
const Logger = require('@utils/logger')
const config = require('@config')

i18n.configure({
  locales: ['vi'],
  defaultLocale: 'vi',
  directory: '../../lang',
  updateFiles: false,
  syncFiles: false,
  register: global
})

module.exports = app => {
  // Health check endpoint
  app.head('/status', (req, res) => {
    res.status(200).end()
  })

  app.enable('trust proxy')

  // Global middleware
  app
    .use(helmet())
    .use(cors({
      exposedHeaders: ['X-Pagination-Total', 'X-Pagination-Page', 'X-Pagination-Limit', 'X-Language-Locale']
    }))
    .use(bodyParser.json({
      extended: true,
      limit: '100kb'
    }))
    .use(bodyParser.urlencoded({
      extended: true,
      limit: '100kb'
    }))
    .use(i18n.init)

  // Language middleware
  app.use((req, res, next) => {
    const lang = req.headers['x-language-locale'] || 'vi'

    req.lang = lang
    req.setLocale(lang)

    next()
  })

  // Ip middleware
  app.use((req, res, next) => {
    req.ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress

    next()
  })

  /**
   * Routers module
   * Require here to wait dependencies injector container loaded
   */
  app.use(`/${config.appApiPrefix}`, require('@api'))

  // Handle error middleware
  app.use((req, res, next) => {
    throw new Error('ERR_ADDRESS_NOT_FOUND')
  })

  app.use((rawError, req, res, next) => {
    let error = null

    // Handle mongoose error
    if (rawError.errors) error = new Error(rawError.errors[Object.keys(rawError.errors)[0]].message)
    else error = rawError

    // For debug
    if (process.env.NODE_ENV === 'development') Logger.error(error)

    res
      .status(500)
      .json({
        error: {
          msg: req.__(error.message),
          code: error.message
        }
      })
  })
}
