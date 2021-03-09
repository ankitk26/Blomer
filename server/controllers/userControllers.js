const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Blog = require("../models/blog");

const handleUserErrors = require("../utils/handleUserErrors");
const { response } = require("express");

const registerUser = async (req, res) => {
  const { email, username, name, password, bio } = req.body;
  try {
    const newUser = new User({ email, username, name, password, bio });
    const savedUser = await newUser.save();
    const payload = { user: { id: savedUser._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 });
    res.status(200).json({ token });
  } catch (err) {
    const errors = handleUserErrors(err);
    res.status(400).json(errors);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("user not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw Error("password incorrect");
    }
    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 });
    res.status(200).json({ token });
  } catch (err) {
    const errors = handleUserErrors(err);
    res.status(400).json(errors);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      throw Error("User does not exist");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getUserProfile = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      throw Error("User not found");
    }
    const blogs = await Blog.find({ user: user._id }).select("heading subheading updatedAt");
    user.blogs = blogs;
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: err.message });
    console.log(err);
  }
};

const updateUserProfile = async (req, res) => {
  const { email, name, bio } = req.body;
  const user = await User.findById(req.user.id);

  let photo = user.photo;
  const tempName = name.split(" ").join("%20");
  if (user.name !== name) {
    photo = `https://avatars.dicebear.com/api/initials/${tempName}.svg`;
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { email, name, bio, photo },
      { new: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  } catch (err) {
    const errors = handleUserErrors(err);
    res.status(500).json(errors);
  }
};

module.exports = { registerUser, loginUser, getUser, getUserProfile, updateUserProfile };
