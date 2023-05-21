const express = require("express");
const {
  getUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../controller/users");

const User = require("../modals/User");
const router = express.Router({ mergeParams: true });

const Course = require("../modals/Course");

const advancedResults = require("../middleware/advancedResult");
const {
  protect,
  authorize,
} = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
