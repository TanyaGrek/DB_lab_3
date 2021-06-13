const mongoose = require('mongoose')

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  street_address: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  country_code: {
    type: String,
    required: true,
    ref: 'Country'
  },
  postal_code: {
    type: String,
    required: true,
    ref: 'City'
  },
}, {
  timestamps: true
})

const Venue = mongoose.model('Venue', venueSchema)

module.exports = Venue;