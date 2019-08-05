const path = require('path')
const alias = require('module-alias')

module.exports = () => {
  alias.addAliases({
    '@api': path.resolve('./src/api'),
    '@core': path.resolve('./src/core'),
    '@config': path.resolve('./src/config'),
    '@utils': path.resolve('./src/utils'),
    '@services': path.resolve('./src/services'),
    '@validators': path.resolve('./src/validators'),
    '@middleware': path.resolve('./src/middleware')
  })
}
