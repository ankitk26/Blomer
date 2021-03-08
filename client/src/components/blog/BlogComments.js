import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../layouts/Spinner";
import { add_comment, get_comments } from "../../redux/reducers/commentReducer";
import AddCommentForm from "./AddCommentForm";
import CommentItem from "./CommentItem";

const BlogComments = ({ blogId }) => {
  const { comments, commentsLoading } = useSelector((state) => state.root.comments);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(blogId);
    dispatch(get_comments(blogId));
  }, [get_comments, add_comment]);

  return commentsLoading ? (
    <Spinner />
  ) : (
    comments && (
      <div className="mt-10">
        <h1 className="text-xl font-bold text-gray-900">{comments.length} Comments</h1>
        <AddCommentForm blogId={blogId} />
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>
    )
  );
};

export default BlogComments;
