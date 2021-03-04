const { Router } = require("express");
const {
  getBlogs,
  getUserBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogControllers");
const router = Router();
const auth = require("../middleware/auth");

router.get("/", getBlogs);

router.get("/user", auth, getUserBlogs);

router.get("/:id", getBlogById);

router.post("/", auth, addBlog);

router.post("/update/:id", auth, updateBlog);

router.delete("/:id", auth, deleteBlog);

module.exports = router;
