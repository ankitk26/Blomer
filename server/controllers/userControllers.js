const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Blog = require("../models/blog");

const handleUserErrors = require("../utils/handleUserErrors");

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
    const blogs = await Blog.find({ user: req.user.id }).select("heading subheading createdAt");
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      throw Error("User does not exist");
    }
    user.blogs = blogs;
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getUserProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const blogs = await Blog.find({ user: id }).select("heading subheading createdAt");
    const user = await User.findById(id).select("-password");
    user.blogs = blogs;
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: err.message });
    console.log(err);
  }
};

module.exports = { registerUser, loginUser, getUser, getUserProfile };
