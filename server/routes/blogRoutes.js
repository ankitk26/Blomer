const { Router } = require("express");
const {
  getBlogs,
  getCurrentUserBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog,
  getOtherUserBlogs,
} = require("../controllers/blogControllers");
const router = Router();
const auth = require("../middleware/auth");

// Get all the blogs for the home page
router.get("/", getBlogs);

// Get current user blogs
router.get("/user", auth, getCurrentUserBlogs);

// Get any user's blogs
router.get("/user/:id", getOtherUserBlogs);

// Get a blog by its id
router.get("/:id", getBlogById);

// Add a blog
router.post("/", auth, addBlog);

// Update a  blog
router.post("/update/:id", auth, updateBlog);

// Delete a blog
router.delete("/:id", auth, deleteBlog);

module.exports = router;
