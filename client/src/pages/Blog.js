import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteBlogBtn from "../components/blog/DeleteBlogBtn";

const Blog = (props) => {
  console.log(props);
  const id = props.match.params.id;

  const { blogs } = useSelector((state) => state.root.blogs);
  const blog = blogs.find((blog) => blog.id === id);

  return (
    blog && (
      <div>
        <div className="flex items-center justify-end gap-5">
          <DeleteBlogBtn id={blog.id} />
          <Link to={`/updateblog/${id}`} className="p-0 focus:outline-none">
            <i className="text-purple-500 material-icons hover:text-purple-700">edit</i>
          </Link>
        </div>
        <h1 className="text-2xl text-center text-gray-900">{blog.heading}</h1>
        <h1 className="mt-2 text-base text-center text-gray-600">{blog.subheading}</h1>
        <p className="text-base text-gray-800 mt-7">
          {blog.body}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores harum ut sunt debitis consequuntur repellat
          quas libero facilis, vel ea consequatur distinctio dicta excepturi nihil quisquam porro, assumenda unde sequi!
        </p>
      </div>
    )
  );
};

export default Blog;
