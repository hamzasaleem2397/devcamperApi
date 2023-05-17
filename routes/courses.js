const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  DeleteCourse,
} = require("../controller/courses");
const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses).post(addCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(DeleteCourse);

module.exports = router;
