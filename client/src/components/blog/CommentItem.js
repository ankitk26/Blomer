import React from "react";
import { useSelector } from "react-redux";
import default_user from "../../assets/images/default_user.svg";
import parseDate from "../../utils/parseDate";
import DeleteBlogBtn from "./DeleteBlogBtn";

const CommentItem = ({ comment }) => {
  const { user, isAuthenticated } = useSelector((state) => state.root.users);

  return (
    <div className="flex items-start gap-5 my-7">
      <img src={default_user} alt="User" className="w-7" />
      <div>
        <div className="flex items-center gap-5">
          <h1 className="text-sm font-bold text-gray-800">{comment.name}</h1>
          <h1 className="text-xs text-gray-800">{parseDate(comment.createdAt)}</h1>
          {user && user._id === comment.user && isAuthenticated && (
            <DeleteBlogBtn id={comment._id} collection="comment" />
          )}
        </div>
        <span className="text-sm text-gray-900">{comment.comment}</span>
      </div>
    </div>
  );
};

export default CommentItem;
