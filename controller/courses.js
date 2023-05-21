const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const Course = require("../modals/Course");
const Bootcamps = require("../modals/Bootcamps");
//@desc Get courses
//@route Get /api/v1/courses
//@route Get /api/v1/bootcamps/:bootcampId/courses
//@access Public
exports.getCourses = asyncHandler(
  async (req, res, next) => {
    //Cpry req.query
    if (req.params.bootcampId) {
      const courses = await Course.find({
        bootcamp: req.params.bootcampId,
      });
      return res.status(200).json({
        sucess: true,
        count: courses.length,
        data: courses,
      });
    } else {
      res.status(200).json(res.advancedResults);
    }
  },
);
//@desc Single courses
//@route Get /api/v1/courses/:id
//@access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(
    req.params.id,
  ).populate({
    path: "bootcamp",
    select: "name description",
  });
  if (!course) {
    return next(
      new ErrorResponse(
        `No course with the id of ${req.params.id}`,
        404,
      ),
    );
  }
  res.status(200).json({
    success: true,
    data: course,
  });
});
//@desc Add courses
//@route Post /api/v1/bootcamps/:bootcampId/course
//@access Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  const bootcamp = await Bootcamps.findById(
    req.params.bootcampId,
  );
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No Bootcamp with the id of ${req.params.bootcampid}`,
        404,
      ),
    );
  }

  //Make sure user is bootcamp owner
  if (
    bootcamp.user.toString() != req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a course to ${bootcamp._id}`,
        404,
      ),
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

//@desc Update courses
//@route Put /api/v1/courses/:id
//@access Private
exports.updateCourse = asyncHandler(
  async (req, res, next) => {
    let course = await Course.findById(req.params.id);
    if (!course) {
      return next(
        new ErrorResponse(
          `Course not found with id of ${req.params.id}`,
          404,
        ),
      );
    }
    //Make sure user is course owner
    if (
      course.user.toString() != req.user.id &&
      req.user.role !== "admin"
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update to ${course._id}`,
          404,
        ),
      );
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({ success: true, data: course });
  },
);
//@desc delete courses
//@route Put /api/v1/courses/:id
//@access Private
exports.DeleteCourse = asyncHandler(
  async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return next(
        new ErrorResponse(
          `Course not found with id of ${req.params.id}`,
          404,
        ),
      );
    }
    //Make sure user is course owner
    if (
      course.user.toString() != req.user.id &&
      req.user.role !== "admin"
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete to ${course._id}`,
          404,
        ),
      );
    }
    await course.deleteOne();
    res.status(200).json({ success: true, data: {} });
  },
);
