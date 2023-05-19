const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  DeleteCourse,
} = require("../controller/courses");
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
  .post(addCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(DeleteCourse);

module.exports = router;
