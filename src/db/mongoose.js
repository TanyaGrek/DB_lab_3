const mongoose = require('mongoose');

const mongodb_url = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/booking'

mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})