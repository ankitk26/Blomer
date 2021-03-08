import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogComments from "../components/blog/BlogComments";
import DeleteBlogBtn from "../components/blog/DeleteBlogBtn";
import Spinner from "../layouts/Spinner";
import { clearCurrent, get_blog_by_id } from "../redux/reducers/blogReducer";
import parseDate from "../utils/parseDate";

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
      <div className="w-4/5 mx-auto my-10">
        {user && user._id === current.user._id && isAuthenticated && (
          <div className="flex items-center justify-end gap-8">
            <DeleteBlogBtn id={current._id} />
            <Link to={`/updateblog/${id}`} className="flex items-center gap-1 p-0 focus:outline-none">
              <i className="text-2xl text-purple-500 material-icons hover:text-purple-700">edit</i>
              <span>Edit blog</span>
            </Link>
          </div>
        )}
        <h1 className="mt-8 text-5xl text-gray-800 uppercase">{current.heading}</h1>
        <h1 className="mt-2 text-xl text-gray-600">{current.subheading}</h1>
        <div className="flex items-center gap-5 mt-5">
          <h5 className="text-sm font-bold text-gray-800 uppercase">
            by{" "}
            <Link to={`/users/profile/${current.user._id}`} className="hover:underline">
              {current.user.name}
            </Link>
          </h5>
          <h4 className="text-sm text-gray-600">{parseDate(current.createdAt)}</h4>
        </div>
        <div className="mt-3 w-10 h-0.5 bg-purple-700" />
        <p className="font-serif text-base text-gray-800 my-7">{current.body}</p>

        <div className="flex items-center gap-5 mt-10">
          {current.tags.map((tag, index) => (
            <span key={index} className="px-4 py-1 text-sm text-gray-800 bg-gray-200">
              {tag}
            </span>
          ))}
        </div>
        <BlogComments blogId={id} />
      </div>
    )
  );
};

export default Blog;
