import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`} className="bg-purple-100 p-3 shadow hover:shadow-lg">
      <h1 className="text-lg text-gray-900">{blog.heading}</h1>
      <h4 className="text-sm text-gray-600">{blog.subheading}</h4>
    </Link>
  );
};

export default BlogItem;
