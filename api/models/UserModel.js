const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/],
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  saved_recipes: {
    type: Array,
  },
});
UserSchema.plugin(uniqueValidator, { message: "already taken" });

const User = mongoose.model("User", UserSchema);
module.exports = User;
