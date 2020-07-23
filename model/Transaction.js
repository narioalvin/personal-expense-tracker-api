const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    min: 2,
  },
  category: {
    type: String,
    required: true,
    min: 2,
  },
  amount: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
