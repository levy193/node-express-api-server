const path = require('path')
const glob = require('glob')
const express = require('express')

const middleware = require('@middleware')
const router = express.Router()
const componentsPath = glob.sync(path.resolve('./src/api/*.js'), {
  ignore: '**/index.js'
})

componentsPath.forEach(componentPath => {
  const component = path.parse(componentPath).name
  const componentRouter = express.Router()

  require(componentPath)(componentRouter)

  router.use(`/${component}`, middleware(component), componentRouter)
})

module.exports = router
