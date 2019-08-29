const faker = require('faker/locale/vi')

module.exports = async (dbConnection, user) => {
  const BookType = dbConnection.model('BookType')

  const data = [
    {
      title: 'Tiên hiệp',
      description: '',
      iconUrl: '',
      createdBy: user
    },
    {
      title: 'Kiếm hiệp',
      description: '',
      iconUrl: '',
      createdBy: user
    },
    {
      title: 'Đô thị',
      description: '',
      iconUrl: '',
      createdBy: user
    },
    {
      title: 'Đam mỹ',
      description: '',
      iconUrl: '',
      createdBy: user
    },
    {
      title: 'Lịch sử - quân sự',
      description: '',
      iconUrl: '',
      createdBy: user
    },
    {
      title: 'Truyện ngắn',
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

  await BookType.deleteMany()
  await BookType.create(data)
  console.log('Fake book type data completed.')
}
