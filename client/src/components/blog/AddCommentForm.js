import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import default_user from "../../assets/images/default_user.svg";
import { add_comment } from "../../redux/reducers/commentReducer";

const AddCommentForm = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const { isAuthenticated } = useSelector((state) => state.root.users);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      setError(null);
      console.log(blogId);
      dispatch(add_comment(blogId, comment));
    } else {
      setError("Login to post comments");
    }
  };

  const cancelComment = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <div className="flex items-start gap-5 my-5">
      <img src={default_user} alt="User's profile" className="w-10" />
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <label htmlFor="commentText">
          <input
            type="text"
            id="commentText"
            className="w-full p-1 text-sm text-gray-900 border-b-2 border-gray-300 focus:outline-none focus:border-gray-500"
            value={comment}
            placeholder="Add comment"
            onFocus={() => setOpen(true)}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <span className="mt-3 text-sm font-bold text-red-700">{error && error}</span>

        {open && (
          <div className="flex justify-end gap-5 mt-5">
            <button
              type="submit"
              className="p-1 px-3 text-sm text-white bg-purple-700 cursor-pointer focus:outline-none hover:bg-purple-900"
            >
              Submit
            </button>
            <button type="button" className="text-sm text-purple-700 focus:outline-none" onClick={cancelComment}>
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddCommentForm;
