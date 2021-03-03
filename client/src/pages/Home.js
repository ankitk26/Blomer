import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogItem from "../components/home/BlogItem";
import { get_blogs } from "../redux/reducers/blogReducer";
import { load_user } from "../redux/reducers/userReducer";

const Home = () => {
  const { blogs, loading } = useSelector((state) => state.root.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_user());
    dispatch(get_blogs());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1 className="text-3xl text-gray-800">Latest blogs</h1>
      <div className="grid grid-cols-3 gap-5 mt-8">
        {loading ? (
          <p>Loading blogs</p>
        ) : (
          blogs &&
          (blogs.length === 0 ? (
            <p className="text-sm text-gray-600">No blogs</p>
          ) : (
            blogs.map((blog) => <BlogItem key={blog._id} blog={blog} />)
          ))
        )}
      </div>
    </>
  );
};

export default Home;
