import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: null,
  blogErrors: null,
  loading: true,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getBlogs: (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
    },
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
      state.blogErrors = null;
    },
    addBlogError: (state, action) => {
      state.blogErrors = action.payload;
    },
    updateBlog: (state, action) => {
      const { _id, heading, subheading, body } = action.payload;
      const blog = state.blogs.find((blog) => blog._id === _id);
      blog.heading = heading;
      blog.subheading = subheading;
      blog.body = body;
      state.blogErrors = null;
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      state.blogs = state.blogs.filter((blog) => blog._id !== id);
    },
    clearBlogs: (state) => {
      state.blogs = null;
      state.blogErrors = null;
    },
  },
});

export const get_blogs = () => async (dispatch) => {
  try {
    const res = await axios.get("/blogs/user");
    dispatch(getBlogs(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const add_blog = (blog) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify(blog);
  try {
    const res = await axios.post("/blogs", body, config);
    dispatch(addBlog(res.data));
  } catch (err) {
    dispatch(addBlogError(err.response.data));
  }
};

export const delete_blog = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/blogs/${id}`);
    dispatch(deleteBlog(res.data._id));
  } catch (err) {
    console.log(err);
  }
};

export const update_blog = (blog) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify(blog);
  try {
    const res = await axios.post(`/blogs/update/${blog.id}`, body, config);
    dispatch(updateBlog(res.data));
  } catch (err) {
    dispatch(addBlogError(err.response.data));
  }
};

export const { getBlogs, addBlog, updateBlog, deleteBlog, addBlogError, clearBlogs } = blogSlice.actions;

export default blogSlice.reducer;
