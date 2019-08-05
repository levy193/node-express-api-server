const path = require('path')
const glob = require('glob')

const validators = {}

const validatorsPath = glob.sync(path.resolve('./src/validators/*.js'), {
  ignore: '**/index.js'
})

validatorsPath.forEach(validatorPath => {
  const validator = path.parse(validatorPath).name
  validators[validator] = require(validatorPath)
})

module.exports = validators
