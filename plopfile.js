const apiGenerator = require('./plop-templates/api/prompt')
const serviceGenerator = require('./plop-templates/service/prompt')
const testGenerator = require('./plop-templates/test/prompt')

module.exports = plop => {
  plop.setGenerator('api', apiGenerator)
  plop.setGenerator('service', serviceGenerator)
  plop.setGenerator('test', testGenerator)
}
