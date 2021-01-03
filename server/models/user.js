const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName:  {type: String, required: true},
  lastName:  {type: String, required: true},
  phoneNumber: {type: String, required: true},
  street: {type: String, required: true},
  streetNumber:  {type: Number, required: true},
  postalCode:  {type: String, required: true},
  city: {type: String, required: true},
  country: {type: String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);