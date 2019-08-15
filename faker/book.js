const faker = require('faker/locale/vi')

module.exports = async (dbConnection, user) => {
  const Book = dbConnection.model('Book')
  const Author = dbConnection.model('Author')
  const BookType = dbConnection.model('BookType')
  const BookCategory = dbConnection.model('BookCategory')

  const authors = await Author.find()
  const bookTypes = await BookType.find()
  const bookCategories = await BookCategory.find()

  const data = []
  for (let i = 0; i <= 10; i++) {
    data.push({
      title: faker.lorem.words(),
      author: authors[i],
      category: bookCategories[i],
      types: bookTypes[i],
      thumbnailUrl: faker.image.nature(),
      description: faker.lorem.paragraphs(),
      status: i % 3 === 0 ? 'in-progress' : i % 3 === 1 ? 'completed' : 'drop',
      nChapters: i + 10,
      contributor: faker.lorem.words(),
      source: faker.lorem.text(),
      createdBy: user
    })
  }

  await Book.deleteMany()
  await Book.create(data)
  console.log('Fake book data completed.')
}
