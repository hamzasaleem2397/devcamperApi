const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  DeleteCourse,
} = require("../controller/courses");

const { protect } = require("../middleware/auth");

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
  .post(protect, addCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, DeleteCourse);

module.exports = router;
