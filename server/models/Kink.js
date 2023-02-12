const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const kinkSchema = new Schema(
  {
    bdsm: {
        type: String,
        required: false,
        unique: false,
        trim: true
      },
      verbal: {
        type: String,
        required: false,
        unique: false,
        trim: true
      },
    username: {
      type: String,
      required: true
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Interest = model('Interest', kinkSchema);

module.exports = Interest;

