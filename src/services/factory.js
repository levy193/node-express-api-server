const path = require('path')
const glob = require('glob')
const diContainer = require('@utils/DiContainer')

class FactoryService {
  constructor() {
    const modelsPaths = glob.sync(path.resolve(`./src/models/*.js`))
    modelsPaths.forEach(modelPath => {
      const model = modelPath.split('/').pop().split('.').shift()
      this[model] = diContainer.get(model)
    })
  }

  async getDocument({ model, query, populate, select }) {
    const document = await this[model]
      .findOne(query)
      .populate(populate)
      .select(select)

    return document
  }

  async getDocuments({ model, query, populate, select }) {
    const documents = await this[model]
      .find(query)
      .populate(populate)
      .select(select)

    return documents
  }

  async createDocument({ model, body, query, populate, select }) {
    const document = await this[model]
      .create(body)

    return document
  }

  async updateDocument({ model, updateQuery, body, query, populate, select }) {
    const document = await this[model]
      .findOneAndUpdate(updateQuery, body, {
        new: true
      })

    return document
  }
}

module.exports = new FactoryService()
