const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../modals/Reviews");
const Bootcamps = require("../modals/Bootcamps");
const Reviews = require("../modals/Reviews");

//@desc Get reviews
//@route Get /api/v1/reviews
//@route Get /api/v1/bootcamps/:bootcampId/reviews
//@access Public
exports.getReviews = asyncHandler(
  async (req, res, next) => {
    //Cpry req.query
    if (req.params.bootcampId) {
      const reviews = await Review.find({
        bootcamp: req.params.bootcampId,
      });
      return res.status(200).json({
        sucess: true,
        count: reviews.length,
        data: reviews,
      });
    } else {
      res.status(200).json(res.advancedResults);
    }
  },
);
//@desc Single reviews
//@route Get /api/v1/reviews/:id
//@access Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(
    req.params.id,
  ).populate({
    path: "bootcamp",
    select: "name description",
  });
  if (!review) {
    return next(
      new ErrorResponse(
        `No review found with the id of ${req.params.id}`,
        404,
      ),
    );
  }
  res.status(200).json({
    success: true,
    data: review,
  });
});
//@desc Add reviews
//@route Post /api/v1/bootcamps/:bootcampId/reviews
//@access Private
exports.AddReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamps.findById(
    req.params.bootcampId,
  );
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with the id of ${req.params.bootcampId}`,
        404,
      ),
    );
  }
  const review = await Review.create(req.body);
  res.status(201).json({
    success: true,
    data: review,
  });
});
//@desc Update reviews
//@route Put /api/v1/reviews/:id
//@access Private
exports.updateReview = asyncHandler(
  async (req, res, next) => {
    let review = await Reviews.findById(req.params.id);
    if (!review) {
      return next(
        new ErrorResponse(
          `No review with the id of ${req.params.id}`,
          404,
        ),
      );
    }
    //Make sure reviews belongs to user or user is admin
    if (
      review.user.toString() !== req.user.id &&
      req.user.id !== "admin"
    ) {
      return next(
        new ErrorResponse(
          `Not authorized to update review `,
          401,
        ),
      );
    }

    review = await Reviews.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      success: true,
      data: review,
    });
  },
);

//@desc Delete reviews
//@route Delete /api/v1/reviews/:id
//@access Private
exports.deleteReview = asyncHandler(
  async (req, res, next) => {
    const review = await Reviews.findById(req.params.id);
    if (!review) {
      return next(
        new ErrorResponse(
          `No review with the id of ${req.params.id}`,
          404,
        ),
      );
    }
    //Make sure reviews belongs to user or user is admin
    if (
      review.user.toString() !== req.user.id &&
      req.user.id !== "admin"
    ) {
      return next(
        new ErrorResponse(
          `Not authorized to update review `,
          401,
        ),
      );
    }

    await review.deleteOne();
    res.status(200).json({
      success: true,
      data: {},
    });
  },
);
