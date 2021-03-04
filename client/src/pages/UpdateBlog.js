import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_blogs, update_blog } from "../redux/reducers/blogReducer";
import { load_user } from "../redux/reducers/userReducer";

const UpdateBlog = (props) => {
  const id = props.match.params.id;

  const { blogs, blogErrors, loading } = useSelector((state) => state.root.blogs);

  const [blog, setBlog] = useState({
    heading: !blogs && "",
    subheading: !blogs && "",
    body: !blogs && "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_user());
    dispatch(get_blogs());

    if (blogs) {
      const { heading, subheading, body } = blogs.find((blog) => blog._id === id);
      setBlog({ heading, subheading, body });
    }
    // eslint-disable-next-line
  }, [loading]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(update_blog({ id, ...blog }));
    props.history.push("/myblogs");
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
            className={`form-control-blog ${
              blogErrors && blogErrors.heading !== "" && "border border-red-600 text-red-600"
            }}`}
            value={blog.heading}
            placeholder="Heading of the blog"
            onChange={handleChange}
          />
          <span className="mt-2 text-sm font-bold text-red-600">{blogErrors && blogErrors.heading}</span>
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
            className={`form-control-blog h-36 ${
              blogErrors && blogErrors.body !== "" && "border border-red-600 text-red-600"
            }}`}
            placeholder="Body of the blog"
            value={blog.body}
            onChange={handleChange}
          />
          <span className="mt-2 text-sm font-bold text-red-600">{blogErrors && blogErrors.body}</span>
        </div>
        <button type="submit" className="mt-5 btn-purple">
          Update blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
