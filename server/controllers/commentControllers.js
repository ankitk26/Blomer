const Comment = require("../models/comment");
const User = require("../models/user");

module.exports.getBlogComments = async (req, res) => {
  const blogId = req.params.id;
  try {
    const comments = await Comment.find({ blog: blogId });
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
  }
};

module.exports.addBlogComment = async (req, res) => {
  const blogId = req.params.id;
  const user = await User.findById(req.user.id).select("-password");
  const { comment } = req.body;

  try {
    const newComment = new Comment({ user: req.user.id, name: user.name, blog: blogId, comment });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteBlogComment = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
  }
};
