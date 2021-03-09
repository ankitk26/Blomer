import React from "react";
import { Link } from "react-router-dom";
import thumbnail from "../../assets/images/default_thumnail.jpg";
import parseDate from "../../utils/parseDate";

const ProfileBlogs = ({ blogs }) => {
  return (
    blogs && (
      <div className="col-span-4">
        {blogs.length === 0 && <p>No blogs</p>}
        {blogs.map((blog) => (
          <div key={blog._id} className="w-2/3 p-3 pb-10 mb-10 border-b-2 border-gray-300 shadow-sm">
            <h4 className="text-sm text-gray-600">{parseDate(blog.updatedAt)}</h4>
            <div>
              <Link to={`/blogs/${blog._id}`}>
                <h1 className="mt-3 text-4xl font-bold text-gray-800 uppercase truncate hover:underline hover:text-gray-600">
                  {blog.heading}
                </h1>
              </Link>
              <h4 className="mt-1 font-serif text-sm text-gray-600 truncate font-subtitle">{blog.subheading}</h4>
              <img src={thumbnail} alt="Blog thumbnail" className="w-full mt-3" />
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default ProfileBlogs;
