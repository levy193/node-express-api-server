const path = require('path')
const alias = require('module-alias')

module.exports = () => {
  alias.addAliases({
    '@api': path.resolve('./src/api'),
    '@utils': path.resolve('./src/utils')
  })
}
