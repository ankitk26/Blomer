import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [
    {
      userId: 1,
      id: "1",
      heading: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      subheading: "Lorem ipsum dolor sit amet consectetur.",
      body:
        "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      userId: 1,
      id: "2",
      heading: "qui est esse",
      subheading: "Lorem ipsum dolor sit amet consectetur.",
      body:
        "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
      userId: 1,
      id: "3",
      heading: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      subheading: "Lorem ipsum dolor sit amet consectetur.",
      body:
        "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    },
  ],
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    updateBlog: (state, action) => {
      const { id, heading, subheading, body } = action.payload;
      const blog = state.blogs.find((blog) => blog.id === id);
      blog.heading = heading;
      blog.subheading = subheading;
      blog.body = body;
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      state.blogs = state.blogs.filter((blog) => blog.id !== id);
    },
  },
});

export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;

export default blogSlice.reducer;
