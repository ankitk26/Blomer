const { Router } = require("express");
const router = Router();

const {
  registerUser,
  loginUser,
  getUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userControllers");

const auth = require("../middleware/auth");

// Get the information about the logged in user
router.get("/user", auth, getUser);

// Register a user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Get profile of a user
router.get("/profile/:username", getUserProfile);

router.post("/update", auth, updateUserProfile);

module.exports = router;
