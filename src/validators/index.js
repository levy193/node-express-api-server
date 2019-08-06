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

const validate = (path, data) => {
  if (!validators[path]) throw new Error('ERR_VALIDATOR_NOT_FOUND')

  const errors = validators[path].validate(data)

  console.log(errors)
}

validate('user', {})

// module.exports = validate
