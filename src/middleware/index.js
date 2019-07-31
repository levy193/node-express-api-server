const passport = require('passport')
const { concat } = require('lodash')

// Base middleware
const baseMdw = []

// Auth middleware
const authMdw = [
  passport.authenticate('user-jwt', { failWithError: true })
]

// Default middleware
const defaultMdw = concat(baseMdw, authMdw)

const constantMdw = {
  auth: concat(baseMdw, [])
}

module.exports = module => constantMdw[module] || defaultMdw
