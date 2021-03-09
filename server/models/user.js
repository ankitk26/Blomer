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
    unique: true,
    required: [true, "Username is required"],
    minlength: [3, "Username should be atleast 6 characters long"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password should be atleast 6 characters long"],
  },
  bio: String,
  photo: String,
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogs",
    },
  ],
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  const name = this.name.split(" ").join("%20");
  this.photo = `https://avatars.dicebear.com/api/initials/${name}.svg`;
  next();
});

module.exports = model("users", userSchema);
