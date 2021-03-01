const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const handleUserErrors = require("../utils/handleUserErrors");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const newUser = new User({ email, username, password });
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
  res.send("Get user");
};

module.exports = { registerUser, loginUser, getUser, getUsers };
