const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    heading: {
      type: String,
      required: [true, "Heading is required"],
    },
    subheading: String,
    body: {
      type: String,
      required: [true, "Body of the blog is required"],
    },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = model("blogs", blogSchema);
