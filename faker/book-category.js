const faker = require('faker/locale/vi')

module.exports = async (dbConnection, user) => {
  const BookCategory = dbConnection.model('BookCategory')

  const data = []
  for (let i = 0; i <= 10; i++) {
    data.push({
      title: faker.lorem.words(),
      description: faker.lorem.paragraphs(),
      iconUrl: faker.image.cats(),
      createdBy: user
    })
  }

  await BookCategory.deleteMany()
  await BookCategory.create(data)
  console.log('Fake book category data completed.')
}
