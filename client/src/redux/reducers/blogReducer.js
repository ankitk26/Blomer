import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allBlogs: null,
  blogs: null,
  blogErrors: null,
  blogLoading: false,
  current: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    startFetching: (state) => {
      state.blogLoading = true;
    },
    getAllBlogs: (state, action) => {
      state.allBlogs = action.payload;
      state.blogLoading = false;
    },
    getCurrentUserBlogs: (state, action) => {
      state.blogs = action.payload;
      state.blogLoading = false;
    },
    getBlogById: (state, action) => {
      state.current = action.payload;
      state.blogLoading = false;
    },
    clearCurrent: (state) => {
      state.current = null;
    },
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
      state.blogErrors = null;
    },
    addBlogError: (state, action) => {
      state.blogErrors = action.payload;
    },
    updateBlog: (state, action) => {
      const { _id, heading, subheading, body, tags } = action.payload;
      const blog = state.blogs.find((blog) => blog._id === _id);
      // blog = {...blog, action.payload};
      blog.heading = heading;
      blog.subheading = subheading;
      blog.body = body;
      blog.tags = tags;
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

export const get_all_blogs = () => async (dispatch) => {
  try {
    const res = await axios.get("/blogs");
    console.log(res.data);
    dispatch(getAllBlogs(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const get_current_user_blogs = () => async (dispatch) => {
  try {
    const res = await axios.get("/blogs/user");
    dispatch(getCurrentUserBlogs(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const get_blog_by_id = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/blogs/${id}`);
    console.log(res.data);
    dispatch(getBlogById(res.data));
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
    await axios.post("/blogs", body, config);
    // dispatch(addBlog(res.data));
  } catch (err) {
    dispatch(addBlogError(err.response.data));
  }
};

export const delete_blog = (id) => async (dispatch) => {
  try {
    await axios.delete(`/blogs/${id}`);
    // dispatch(deleteBlog(res.data._id));
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
    const res = await axios.post(`/blogs/update/${blog._id}`, body, config);
    dispatch(updateBlog(res.data));
    console.log(res.data);
  } catch (err) {
    dispatch(addBlogError(err.response.data));
  }
};

export const {
  startFetching,
  getAllBlogs,
  getCurrentUserBlogs,
  getBlogById,
  clearCurrent,
  addBlog,
  updateBlog,
  deleteBlog,
  addBlogError,
  clearBlogs,
} = blogSlice.actions;

export default blogSlice.reducer;
