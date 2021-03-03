import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../redux/reducers/blogReducer";

const UpdateBlog = (props) => {
  const id = props.match.params.id;
  const [blog, setBlog] = useState({
    heading: "",
    subheading: "",
    body: "",
  });

  const initBlog = useSelector((state) => state.root.blogs.blogs.find((blog) => blog.id === id));

  useEffect(() => {
    setBlog({
      heading: initBlog.heading,
      subheading: initBlog.subheading,
      body: initBlog.body,
    });
  }, [initBlog]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBlog({ id, ...blog }));
    props.history.push("/");
  };

  return (
    <div>
      <h1 className="text-2xl">Update blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-start mt-5">
        <div className="flex flex-col w-full my-5 mt-0">
          <label htmlFor="heading">Heading</label>
          <input
            type="text"
            id="heading"
            name="heading"
            className="form-control-blog"
            value={blog.heading}
            placeholder="Heading of the blog"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full">
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
        <div className="flex flex-col w-full mt-5">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            name="body"
            className="form-control-blog h-36"
            placeholder="Body of the blog"
            value={blog.body}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="mt-5 btn-purple">
          Update blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
