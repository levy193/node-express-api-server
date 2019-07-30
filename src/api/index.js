const path = require('path')
const glob = require('glob')
const express = require('express')

const middleware = require('@middleware')

module.exports = router => {
  const componentsPath = glob.sync(path.resolve('./src/api/!(*.*)'))

  const componentsName = componentsPath.map(v => {
    return path.parse(v).name
  })

  componentsName.forEach(component => {
    const componentRouter = express.Router()
    const routes = glob.sync(path.join(__dirname, `./${component}/*.js`))

    routes.forEach(route => {
      require(route)(componentRouter)
    })

    router.use(`/${component}`, middleware(component), componentRouter)
  })
}
