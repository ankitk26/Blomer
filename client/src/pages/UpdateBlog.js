import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogTagsInput from "../components/blog/BlogTagsInput";
import { clearCurrent, get_blog_by_id, update_blog } from "../redux/reducers/blogReducer";

const UpdateBlog = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();

  const { current, loading, blogErrors } = useSelector((state) => state.root.blogs);

  const [blog, setBlog] = useState(current || { heading: "", subheading: "", body: "", tags: [] });

  useEffect(() => {
    dispatch(get_blog_by_id(id));

    if (current) {
      const { _id, heading, subheading, body, tags } = current;
      setBlog({ _id, heading, subheading, body, tags });
    }

    return () => {
      dispatch(clearCurrent());
    };

    // eslint-disable-next-line
  }, [get_blog_by_id, loading]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(update_blog(blog));
    if (update_blog) {
      props.history.push("/dashboard");
    }
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

        <button type="button" className="mt-5 btn-purple" onClick={handleSubmit}>
          Update blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
