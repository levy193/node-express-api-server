const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

const config = require('@config')

const cookieExtractor = req => {
  let token = null

  if (req && req.cookies) {
    token = req.cookies['accessToken']
  }

  if (!token) throw new Error('ERR_MISSING_AUTHENTICATION_METHOD')

  return token
}

module.exports = (modelName, mongoose) => {
  const Model = mongoose.model(modelName)
  const strategy = `${modelName.toLowerCase()}-jwt`

  passport.serializeUser(Model.serializeUser())
  passport.deserializeUser(Model.deserializeUser())

  passport.use(strategy, new JwtStrategy({
    secretOrKey: config.auth.jwtSecret,
    jwtFromRequest: extractJwt.fromExtractors([
      extractJwt.versionOneCompatibility({
        tokenBodyField: 'accessToken',
        tokenQueryParameterName: 'accessToken',
        authScheme: 'Bearer'
      }),
      cookieExtractor
    ]),
    session: false
  }, async (payload, done) => {
    try {
      const account = await Model.findById(payload.uid)

      if (!account) throw new Error('ERR_ACCOUNT_NOT_FOUND')

      if (!account.sid || account.sid !== payload.sid) throw new Error('ERR_SESSION_EXPIRED')

      done(null, account)
    } catch (err) {
      done(err, false)
    }
  }))
}
