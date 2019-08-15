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

  async getDocument({ model, query, populate }) {
    const document = await this[model]
      .findOne(query)
      .populate(populate)

    return document
  }

  async getDocuments({ model, query, populate, select }) {
    const documents = await this[model]
      .find(query)
      .populate(populate)
      .select(select)

    return documents
  }
}

module.exports = new FactoryService()
