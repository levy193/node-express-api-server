const apiGenerator = require('./plop-templates/api/prompt')
const serviceGenerator = require('./plop-templates/service/prompt')
const testGenerator = require('./plop-templates/test/prompt')
const modelGenerator = require('./plop-templates/model/prompt')

module.exports = plop => {
  plop.setGenerator('api', apiGenerator)
  plop.setGenerator('service', serviceGenerator)
  plop.setGenerator('model', modelGenerator)
  plop.setGenerator('test', testGenerator)
}
