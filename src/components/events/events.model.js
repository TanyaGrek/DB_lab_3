const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    text: true,
    tags: 'text',
    index: true
  },
  starts: {
    type: String,
    required: true,
    trim: true
  },
  ends: {
    type: String,
    required: true,
    trim: true,
  },
  venue_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue'
  },
  postal_code: {
    type: String,
    required: true,
    ref: 'City'
  },
}, {
  timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event;