// Import required modules
const mongoose = require("mongoose");

// Create a Mongoose schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    min: 6,
    max: 32,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 32,
    required: true,
  },

  email: {
    type: String,
    min: 6,
    max: 32,
    required: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
