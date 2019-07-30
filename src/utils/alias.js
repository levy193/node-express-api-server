const path = require('path')
const alias = require('module-alias')

module.exports = () => {
  alias.addAliases({
    '@api': path.resolve('./src/api'),
    '@core': path.resolve('./src/core'),
    '@config': path.resolve('./src/config'),
    '@utils': path.resolve('./src/utils'),
    '@middleware': path.resolve('./src/middleware')
  })
}
