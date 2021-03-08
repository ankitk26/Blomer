import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogItem from "../components/home/BlogItem";
import Spinner from "../layouts/Spinner";
import { get_all_blogs } from "../redux/reducers/blogReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, allBlogs } = useSelector(({ root: { blogs } }) => blogs);

  useEffect(() => {
    dispatch(get_all_blogs());
    // eslint-disable-next-line
  }, [get_all_blogs]);

  return (
    <>
      <h1 className="text-3xl text-gray-800">Latest blogs</h1>
      {loading ? (
        <Spinner className="mt-5" />
      ) : (
        allBlogs &&
        (allBlogs.length === 0 ? (
          <p className="mt-5 text-sm text-gray-600">No blogs available right now</p>
        ) : (
          <div className="grid grid-cols-3 gap-10 mt-8">
            {allBlogs.map((blog) => (
              <BlogItem key={blog._id} blog={blog} />
            ))}{" "}
          </div>
        ))
      )}
    </>
  );
};

export default Home;
