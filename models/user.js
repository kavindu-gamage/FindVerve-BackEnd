const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    maxlenght: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlenght: 50,
  },
  password:{
    type: String,
    required: true,
    minlength: 3,
    maxlenght: 10,
  }
});

// Create the user model
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
