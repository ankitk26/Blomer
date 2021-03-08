import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogTagsInput from "../components/blog/BlogTagsInput";
import { add_blog } from "../redux/reducers/blogReducer";

const PostBlog = (props) => {
  const [blog, setBlog] = useState({
    heading: "",
    subheading: "",
    body: "",
    tags: [],
  });

  const dispatch = useDispatch();
  const { blogErrors } = useSelector((state) => state.root.blogs);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add_blog(blog));
    props.history.push("/dashboard");
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
        <div className="flex flex-col w-full mb-5">
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

        <div className="flex flex-col w-full mb-5">
          <label htmlFor="body">Body</label>
          <TextareaAutosize
            id="body"
            name="body"
            rowsMin={5}
            className={`form-control-blog resize-none overflow-hidden h-36 ${
              blogErrors && "border border-red-600 text-red-600"
            }}`}
            placeholder="Body of the blog"
            value={blog.body}
            onChange={handleChange}
          />

          <span className="mt-2 text-sm font-bold text-red-600">{blogErrors && blogErrors.body}</span>
        </div>
        <BlogTagsInput tags={blog.tags} blog={blog} setBlog={setBlog} />
        <button type="button" className="my-10 btn-purple" onClick={handleSubmit}>
          Add blog
        </button>
      </form>
    </div>
  );
};

export default PostBlog;
