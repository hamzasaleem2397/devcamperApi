const express = require("express");
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require("../controller/bootcamps");

//Include other resource routers
const courseRotuer = require("./courses");
const router = express.Router();
//Re-route into other resource router
router.use("/:bootcampId/courses", courseRotuer);
router
  .route("/radius/:zipcode/:distance")
  .get(getBootcampsInRadius);
router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
module.exports = router;
