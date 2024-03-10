const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
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
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlenght: 10,
    },
    profilePath: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Create the user model
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
