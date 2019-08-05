const path = require('path')
const glob = require('glob')

const utils = {}

const utilsPath = glob.sync(path.resolve('./src/utils/*.js'), {
  ignore: '**/index.js'
})

utilsPath.forEach(utilPath => {
  const util = path.parse(utilPath).name
  utils[util] = require(utilPath)
})

module.exports = utils
