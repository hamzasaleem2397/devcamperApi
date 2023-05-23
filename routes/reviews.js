const express = require("express");
const {
  getReviews,
  getReview,
  AddReview,
  updateReview,
} = require("../controller/reviews");

const {
  protect,
  authorize,
} = require("../middleware/auth");

const Reviews = require("../modals/Reviews");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResult");

router
  .route("/")
  .get(
    advancedResults(Reviews, {
      path: "bootcamp",
      select: "name desciption",
    }),
    getReviews,
  )
  .post(protect, authorize("user", "admin"), AddReview);
router
  .route("/:id")
  .get(getReview)
  .put(protect, authorize("user", "admin"), updateReview);
module.exports = router;
