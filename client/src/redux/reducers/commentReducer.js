import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  commentsLoading: false,
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchComments: (state) => {
      state.commentsLoading = true;
    },
    getComments: (state, action) => {
      state.comments = action.payload;
      state.commentsLoading = false;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
      state.commentsLoading = false;
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter((comment) => comment._id !== action.payload);
      state.commentsLoading = false;
    },
  },
});

export const get_comments = (id) => async (dispatch) => {
  try {
    // dispatch(fetchComments());
    const res = await axios.get(`/comment/${id}`);
    console.log(res.data);
    dispatch(getComments(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const add_comment = (id, comment) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify({ comment });
  try {
    console.log(body, id);
    const res = await axios.post(`/comment/${id}`, body, config);
    console.log(res.data);
    dispatch(addComment(res.data));
  } catch (err) {
    console.log(err);
    // dispatch(addBlogError(err.response.data));
  }
};

export const delete_comment = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/comment/${id}`);
    console.log(res.data);
    dispatch(deleteComment(res.data._id));
  } catch (err) {
    console.log(err);
  }
};

export const { fetchComments, getComments, addComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;
