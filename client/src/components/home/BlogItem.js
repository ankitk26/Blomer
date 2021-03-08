import React from "react";
import { Link } from "react-router-dom";
import thumbnail from "../../assets/images/default_thumnail.jpg";

const BlogItem = ({ blog, userid }) => {
  return (
    <div className="pb-5 bg-gray-100 shadow-sm hover:shadow-lg">
      <img src={thumbnail} alt="Blog thumbnail" className="w-full" />
      <div className="px-3">
        <Link to={`/blogs/${blog._id}`}>
          <h1 className="mt-3 text-lg font-bold text-gray-800 uppercase truncate hover:underline hover:text-gray-600">
            {blog.heading}
          </h1>
        </Link>
        <Link to={`/users/profile/${blog.user._id}`}>
          <h3 className="text-sm text-gray-500">
            by <span className="hover:underline">{blog.user.name}</span>
          </h3>
        </Link>
        <h4 className="mt-3 font-serif text-sm text-gray-600 truncate font-subtitle">{blog.subheading}</h4>
      </div>
    </div>
  );
};

export default BlogItem;
