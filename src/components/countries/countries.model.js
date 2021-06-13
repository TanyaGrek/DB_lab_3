const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({
  country_code: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  country_name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
}, {
  timestamps: true
})

const Country = mongoose.model('Country', countrySchema)

module.exports = Country