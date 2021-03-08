const { Router } = require("express");
const router = Router();
const { getBlogComments, addBlogComment, deleteBlogComment } = require("../controllers/commentControllers");

const auth = require("../middleware/auth");

// Get the comments of a blog
router.get("/:id", getBlogComments);

// Post a comment for a blog
router.post("/:id", auth, addBlogComment);

// Delete a blog's comment
router.delete("/:id", auth, deleteBlogComment);

module.exports = router;
