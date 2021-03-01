const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: [isEmail, "Email is not valid"],
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password should be atleast 6 characters long"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = model("users", userSchema);
