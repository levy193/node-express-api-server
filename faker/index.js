const path = require('path')
const glob = require('glob')

const config = require('./src/config')

const mongooseLoader = require('./src/loaders/mongoose')

const authorFake = require('./author')
const bookCategoryFake = require('./book-category')
const bookTypeFake = require('./book-type')
const bookFake = require('./book')

const fake = async () => {
  const dbConnection = await mongooseLoader(config.dbURI)

  const User = dbConnection.model('User')

  const user = await User.findOne({
    username: 'levy193'
  })

  await authorFake(dbConnection, user)
  await bookCategoryFake(dbConnection, user)
  await bookTypeFake(dbConnection, user)
  await bookFake(dbConnection, user)

  console.log('Fake all done')
}

fake()
