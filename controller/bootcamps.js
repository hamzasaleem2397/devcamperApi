const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Bootcamps = require("../modals/Bootcamps");

//@desc Get all bottcamos
//@route Get /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(
  async (req, res, next) => {
    let query;
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    query = Bootcamps.find(JSON.parse(queryStr));
    const bootcamps = await query;
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
//@desc Get  bootcamp within radius
//@route Get /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler(
  async (req, res, next) => {
    const { zipcode, distance } = req.params;
    //Get lat/lng from gecoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    //Calc redius using radians
    //Div dist by radius of Earth
    //Earh Radius=3,963 mi / 6,378km
    const radius = distance / 3963;
    const bootcamps = await Bootcamps.find({
      location: {
        $geoWithin: { $centerSphere: [[lng, lat], radius] },
      },
    });
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  },
);
