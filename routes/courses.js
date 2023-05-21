const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  DeleteCourse,
} = require("../controller/courses");

const {
  protect,
  authorize,
} = require("../middleware/auth");

const router = express.Router({ mergeParams: true });
const Course = require("../modals/Course");
const advancedResults = require("../middleware/advancedResult");
router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name desciption",
    }),
    getCourses,
  )
  .post(
    protect,
    authorize("publisher", "admin"),
    addCourse,
  );
router
  .route("/:id")
  .get(getCourse)
  .put(
    protect,
    authorize("publisher", "admin"),
    updateCourse,
  )
  .delete(
    protect,
    authorize("publisher", "admin"),
    DeleteCourse,
  );

module.exports = router;
