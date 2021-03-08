import { combineReducers } from "@reduxjs/toolkit";
import blogReducer from "./blogReducer";
import commentReducer from "./commentReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  comments: commentReducer,
});

export default rootReducer;
