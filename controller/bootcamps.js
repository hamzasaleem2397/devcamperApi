const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamps = require("../modals/Bootcamps");

//@desc Get all bottcamos
//@route Get /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(
  async (req, res, next) => {
    const bootcamps = await Bootcamps.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  },
);
//@desc Get single bottcamos
//@route Get /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(
  async (req, res, next) => {
    const bootcamp = await Bootcamps.findById(
      req.params.id,
    );
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with id of ${req.params.id}`,
          404,
        ),
      );
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  },
);
//@desc Get create bottcamp
//@route Post /api/v1/bootcamps/:id
//@access
exports.createBootcamp = asyncHandler(
  async (req, res, next) => {
    const bootcamp = await Bootcamps.create(req.body);

    res.status(201).json({
      sucess: true,
      data: bootcamp,
    });

    //   .status(200)
    //   .send({ sucess: false, msg: "create new bootcamp" });
  },
);
//@desc Get update bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Public
exports.updateBootcamp = asyncHandler(
  async (req, res, next) => {
    const bootcamp = await Bootcamps.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with id of ${req.params.id}`,
          404,
        ),
      );
    }
    res.status(200).json({ success: true, data: bootcamp });

    // res.status(200).send({
    //   sucess: true,
    //   msg: `update a bootcamp ${req.params.id}`,
    // });
  },
);
//@desc Get delete bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Public
exports.deleteBootcamp = asyncHandler(
  async (req, res, next) => {
    const bootcamp = await Bootcamps.findByIdAndDelete(
      req.params.id,
    );
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with id of ${req.params.id}`,
          404,
        ),
      );
    }
    res.status(200).json({ success: true, data: {} });
  },
);
