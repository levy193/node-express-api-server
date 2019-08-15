const mongoose = require('mongoose')

const Types = mongoose.Schema.Types

const schema = {
  title: {
    type: String,
    required: [true, 'ERR_TITLE_REQUIRED']
  },

  author: {
    type: Types.ObjectId,
    ref: 'Author',
    required: [true, 'ERR_AUTHOR_REQUIRED']
  },

  category: [{
    type: Types.ObjectId,
    ref: 'BookCategory',
    required: [true, 'ERR_CATEGORIES_REQUIRED']
  }],

  types: [{
    type: Types.ObjectId,
    ref: 'BookType',
    required: [true, 'ERR_TYPES_REQUIRED']
  }],

  thumbnailUrl: {
    type: String,
    required: [true, 'ERR_COVER_REQUIRED']
  },

  description: {
    type: String
  },

  status: {
    type: String,
    enum: ['in-progress', 'completed', 'drop']
  },

  nChapters: {
    type: Number,
    default: 0
  },

  rating: {
    type: Number,
    default: 0
  },

  view: {
    type: Number,
    default: 0
  },

  contributor: {
    type: String
  },

  source: {
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

  return dbConnection.model('Book', modelSchema)
}

module.exports = {
  model,
  schema
}
