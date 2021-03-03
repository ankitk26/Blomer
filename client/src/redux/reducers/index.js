import { combineReducers } from "@reduxjs/toolkit";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
});

export default rootReducer;
