const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    ref: 'used',
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = model('card', cardSchema);