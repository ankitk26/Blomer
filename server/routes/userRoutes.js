const { Router } = require("express");
const router = Router();
const { registerUser, loginUser, getUser, getUsers } = require("../controllers/userControllers");
const auth = require("../middleware/auth");

router.get("/", auth, getUsers);
router.get("/user", auth, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
