const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   // roles - driver or rider
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  lastFourDigits: {
    type: String,
    required: true
  },
  // Instead of account number and routing number, store a token
  token: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('BankAccount', bankAccountSchema);
