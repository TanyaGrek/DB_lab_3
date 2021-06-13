const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  postal_code: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  country_code: {
    type: String,
    required: true,
    trim: true,
    ref: 'Country'
  },
}, {
  timestamps: true
})

const City = mongoose.model('City', citySchema)

module.exports = City