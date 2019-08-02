const apiGenerator = require('./plop-templates/api/prompt')
const serviceGenerator = require('./plop-templates/service/prompt')

module.exports = plop => {
  plop.setGenerator('api', apiGenerator)
  plop.setGenerator('service', serviceGenerator)
}
