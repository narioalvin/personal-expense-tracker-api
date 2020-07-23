const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  passcode: {
    type: String,
    required: true,
    min: 4,
    max: 4,
  },
  modificationDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
