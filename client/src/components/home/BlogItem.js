import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ blog: { _id, heading, subheading } }) => {
  return (
    <Link to={`/blogs/${_id}`} className="p-3 bg-purple-100 shadow hover:shadow-lg">
      <h1 className="text-lg text-gray-900">{heading}</h1>
      <h4 className="text-sm text-gray-600">{subheading}</h4>
    </Link>
  );
};

export default BlogItem;
