import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteBlogBtn from "../components/blog/DeleteBlogBtn";
import Spinner from "../layouts/Spinner";
import { clearCurrent, get_blog_by_id } from "../redux/reducers/blogReducer";

const Blog = (props) => {
  const id = props.match.params.id;

  const { current, loading } = useSelector((state) => state.root.blogs);
  const { user, isAuthenticated } = useSelector((state) => state.root.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_blog_by_id(id));

    return () => {
      dispatch(clearCurrent());
    };

    // eslint-disable-next-line
  }, [get_blog_by_id, loading]);

  return loading ? (
    <Spinner />
  ) : (
    current && (
      <div>
        {user && user._id === current.user && isAuthenticated && (
          <div className="flex items-center justify-end gap-8">
            <DeleteBlogBtn id={current._id} />
            <Link to={`/updateblog/${id}`} className="flex items-center gap-1 p-0 focus:outline-none">
              <i className="text-2xl text-purple-500 material-icons hover:text-purple-700">edit</i>
              <span>Edit blog</span>
            </Link>
          </div>
        )}
        <h1 className="mt-8 text-2xl text-center text-gray-900">{current.heading}</h1>
        <h1 className="mt-2 text-base text-center text-gray-600">{current.subheading}</h1>
        <p className="text-base text-gray-800 mt-7">{current.body}</p>
      </div>
    )
  );
};

export default Blog;
