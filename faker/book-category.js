const faker = require('faker/locale/vi')

module.exports = async (dbConnection, user) => {
  const BookCategory = dbConnection.model('BookCategory')

  const data = [
    {
      title: 'Dịch',
      description: '',
      iconUrl: '',
      createdBy: user
    },
    {
      title: 'Convert',
      description: '',
      iconUrl: '',
      createdBy: user
    },
    {
      title: 'Sưu tầm',
      description: '',
      iconUrl: '',
      createdBy: user
    },
    {
      title: 'Hay',
      description: '',
      iconUrl: '',
      createdBy: user
    },
    {
      title: 'Đã hoàn thành',
      description: '',
      iconUrl: '',
      createdBy: user
    }
  ]
  // for (let i = 0; i <= 10; i++) {
  //   data.push({
  //     title: faker.lorem.words(),
  //     description: faker.lorem.paragraphs(),
  //     iconUrl: faker.image.cats(),
  //     createdBy: user
  //   })
  // }

  await BookCategory.deleteMany()
  await BookCategory.create(data)
  console.log('Fake book category data completed.')
}
