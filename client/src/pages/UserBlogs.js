import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogItem from "../components/home/BlogItem";
import Spinner from "../layouts/Spinner";
import { get_blogs } from "../redux/reducers/blogReducer";

const MyBlogs = () => {
  const { blogs, loading } = useSelector((state) => state.root.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_blogs());
    // eslint-disable-next-line
  }, [get_blogs, loading]);

  return (
    <>
      <h1 className="text-3xl text-gray-800">Your blogs</h1>
      {loading ? (
        <Spinner className="mt-5" />
      ) : (
        <div className="grid grid-cols-3 gap-5 mt-8">
          {blogs &&
            (blogs.length === 0 ? (
              <p className="text-sm text-gray-600">No blogs</p>
            ) : (
              blogs.map((blog) => <BlogItem key={blog._id} blog={blog} />)
            ))}
        </div>
      )}
    </>
  );
};

export default MyBlogs;
