const mongoose = require('mongoose');

const phoneNumberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    match: /^\d{10}$/, // Ensures 10 digits
    unique: true, // Prevents duplicate numbers
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PhoneNumber', phoneNumberSchema);