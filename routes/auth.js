const express = require("express");
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  logout,
} = require("../controller/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.get("/logout", protect, logout);
router.get("/me", protect, getMe);
router.post("/login", login);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
