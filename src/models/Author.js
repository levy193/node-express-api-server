const mongoose = require('mongoose')

const Types = mongoose.Schema.Types

const schema = {
  name: {
    type: String
  },

  penName: {
    type: String,
    required: [true, 'ERR_PEN_NAME_REQUIRED']
  },

  description: {
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

  return dbConnection.model('Author', modelSchema)
}

module.exports = {
  model,
  schema
}
