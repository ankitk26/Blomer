const Blog = require("../models/blog");
const User = require("../models/user");

const handleBlogErrors = require("../utils/handleBlogErrors");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", ["username", "name"]);
    res.status(200).json(blogs);
  } catch (err) {
    console.log(err.message);
  }
};

const getBlogById = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id).populate("user", ["name", "username"]);
    res.status(200).json(blog);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const getCurrentUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });
    res.status(200).json(blogs);
  } catch (err) {
    console.log(err);
  }
};

const getOtherUserBlogs = async (req, res) => {
  const id = req.params.id;
  try {
    const blogs = await Blog.find({ user: id });
    res.status(200).json(blogs);
  } catch (err) {
    console.log(err);
  }
};

const addBlog = async (req, res) => {
  const { heading, subheading, body, tags } = req.body;
  try {
    const newBlog = new Blog({
      heading,
      subheading,
      body,
      user: req.user.id,
      tags,
    });
    const addedBlog = await newBlog.save();
    res.status(200).json(addedBlog);
  } catch (err) {
    const errors = handleBlogErrors(err);
    res.status(400).json(errors);
  }
};

const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { heading, subheading, body, tags } = req.body;
  try {
    const blog = await Blog.findById(id);
    blog.heading = heading;
    blog.subheading = subheading;
    blog.body = body;
    blog.tags = tags;
    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    const errors = handleBlogErrors(err);
    res.status(400).json(errors);
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    res.status(200).json(blog);
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = { getBlogs, getBlogById, getCurrentUserBlogs, getOtherUserBlogs, addBlog, updateBlog, deleteBlog };
