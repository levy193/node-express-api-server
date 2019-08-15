const mongoose = require('mongoose')

const Types = mongoose.Schema.Types

const schema = {
  title: {
    type: String
  },

  description: {
    type: String
  },

  iconUrl: {
    type: String
  },

  createdBy: {
    type: Types.ObjectId,
    required: [true, 'ERR_CREATED_BY_REQUIRED'],
    ref: 'User'
  }
}

const model = dbConnection => {
  const modelSchema = new mongoose.Schema(schema, {
    timestamps: true
  })

  return dbConnection.model('BookCategory', modelSchema)
}

module.exports = {
  model,
  schema
}
