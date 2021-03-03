import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteBlogBtn from "../components/blog/DeleteBlogBtn";
import { get_blogs } from "../redux/reducers/blogReducer";
import { load_user } from "../redux/reducers/userReducer";

const Blog = (props) => {
  const id = props.match.params.id;

  const { blogs, loading } = useSelector((state) => state.root.blogs);
  const [blog, setBlog] = useState(blogs ? blogs.find((blog) => blog._id === id) : {});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_user());
    dispatch(get_blogs());

    if (blogs) {
      setBlog(blogs.find((blog) => blog._id === id));
    }
    // eslint-disable-next-line
  }, [loading]);

  return !blog ? (
    <p>N/A</p>
  ) : (
    <div>
      <div className="flex items-center justify-end gap-5">
        <DeleteBlogBtn id={blog._id} />
        <Link to={`/updateblog/${id}`} className="p-0 focus:outline-none">
          <i className="text-purple-500 material-icons hover:text-purple-700">edit</i>
        </Link>
      </div>
      <h1 className="text-2xl text-center text-gray-900">{blog.heading}</h1>
      <h1 className="mt-2 text-base text-center text-gray-600">{blog.subheading}</h1>
      <p className="text-base text-gray-800 mt-7">{blog.body}</p>
    </div>
  );
};

export default Blog;
