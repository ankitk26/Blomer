const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "blogs",
    },
    name: String,
    comment: String,
  },
  { timestamps: true }
);

module.exports = Comment = model("comments", commentSchema);
