const apiGenerator = require('./plop-templates/api/prompt')

module.exports = plop => {
  plop.setGenerator('api', apiGenerator)
}
