import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_blog } from "../redux/reducers/blogReducer";

const PostBlog = (props) => {
  const [blog, setBlog] = useState({
    heading: "",
    subheading: "",
    body: "",
  });

  const dispatch = useDispatch();
  const { blogErrors } = useSelector((state) => state.root.blogs);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add_blog(blog));
    props.history.push("/myblogs");
  };

  return (
    <div>
      <h1>{blogErrors && blogErrors}</h1>
      <h1 className="text-2xl">Post new blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-start mt-5">
        <div className="flex flex-col w-full my-5 mt-0">
          <label htmlFor="heading">Heading</label>
          <input
            type="text"
            id="heading"
            name="heading"
            className={`form-control-blog ${blogErrors && "border border-red-600 text-red-600"}}`}
            value={blog.heading}
            placeholder="Heading of the blog"
            onChange={handleChange}
          />
          <span className="mt-2 text-sm font-bold text-red-600">{blogErrors && blogErrors.heading}</span>
        </div>
        <div className="flex flex-col w-full my-5">
          <label htmlFor="subheading">Subheading</label>
          <input
            type="text"
            id="subheading"
            className="form-control-blog"
            name="subheading"
            value={blog.subheading}
            placeholder="Subheading of the blog"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            name="body"
            className={`form-control-blog h-36 ${blogErrors && "border border-red-600 text-red-600"}}`}
            placeholder="Body of the blog"
            value={blog.body}
            onChange={handleChange}
          />
          <span className="mt-2 text-sm font-bold text-red-600">{blogErrors && blogErrors.body}</span>
        </div>
        <button type="submit" className="mt-5 btn-purple">
          Add blog
        </button>
      </form>
    </div>
  );
};

export default PostBlog;
