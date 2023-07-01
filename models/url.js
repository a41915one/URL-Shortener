const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  original: {
    type: String,
    required: true
  },
  shorten: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model('URL', urlSchema)





