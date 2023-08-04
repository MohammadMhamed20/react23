const {
  addNewUserController,
  loginController,
  updateProfileController,
} = require("../controllers/authController");
const checkAuth = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register", addNewUserController);

router.post("/login", loginController);

router.put("/update-profile", checkAuth, updateProfileController);

module.exports = router;
