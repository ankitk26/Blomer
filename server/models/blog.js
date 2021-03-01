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
    subheading: {
      type: String,
    },
    body: {
      type: String,
      required: [true, "Body of the blog is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("blogs", blogSchema);
