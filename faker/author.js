const faker = require('faker/locale/vi')

module.exports = async (dbConnection, user) => {
  const Author = dbConnection.model('Author')

  const data = []
  for (let i = 0; i <= 10; i++) {
    data.push({
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      penName: faker.name.findName(),
      description: faker.lorem.paragraphs(),
      createdBy: user
    })
  }

  await Author.deleteMany()
  await Author.create(data)
  console.log('Fake author data completed.')
}
