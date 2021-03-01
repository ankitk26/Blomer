const Blog = require("../models/blog");

const handleBlogErrors = require("../utils/handleBlogErrors");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.log(err.message);
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addBlog = async (req, res) => {
  const { heading, subheading, body } = req.body;
  try {
    const newBlog = new Blog({ heading, subheading, body, user: req.user.id });
    const addedBlog = await newBlog.save();
    res.status(200).json(addedBlog);
  } catch (err) {
    const errors = handleBlogErrors(err);
    res.status(400).json(errors);
    // res.status(400).send("error");
  }
};

const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { heading, subheading, body } = req.body;
  try {
    const blog = await Blog.findById(id);
    blog.heading = heading;
    blog.subheading = subheading;
    blog.body = body;
    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    const errors = handleBlogErrors(err);
    // console.log(err.message);
    res.status(400).json(errors);
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findOneAndDelete(id);
    res.status(200).json(blog);
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = { getBlogs, getUserBlogs, addBlog, updateBlog, deleteBlog };
