import React from "react";
import { useSelector } from "react-redux";
import BlogItem from "../components/home/BlogItem";

const Home = () => {
  const { blogs } = useSelector((state) => state.root.blogs);

  return (
    <>
      <h1 className="text-3xl text-gray-800">Latest blogs</h1>
      <div className="grid grid-cols-3 gap-5 mt-8">
        {blogs.length === 0 ? (
          <p className="text-sm text-gray-600">No blogs</p>
        ) : (
          blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)
        )}
      </div>
    </>
  );
};

export default Home;
