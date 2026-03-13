const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

const User = mongoose.model('User', userSchema);
module.exports = User;
