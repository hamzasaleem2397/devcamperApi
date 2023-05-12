const Bootcamps = require("../modals/Bootcamps");
const Bootcamp = require("../modals/Bootcamps");

//@desc Get all bottcamos
//@route Get /api/v1/bootcamps
//@access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamps.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    res.status(400).send({
      sucess: false,
      msg: `failed`,
    });
  }
};
//@desc Get single bottcamos
//@route Get /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.findById(
      req.params.id,
    );
    if (!bootcamp) {
      return res.status(400).send({
        sucess: false,
        msg: `failed`,
      });
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).send({
      sucess: false,
      msg: `failed`,
    });
  }
};
//@desc Get create bottcamp
//@route Post /api/v1/bootcamps/:id
//@access
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      sucess: true,
      data: bootcamp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
    });
  }

  //   .status(200)
  //   .send({ sucess: false, msg: "create new bootcamp" });
};
//@desc Get update bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Public
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!bootcamp) {
      return res
        .status(400)
        .json({ success: false, error: "I Dont Know" });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  // res.status(200).send({
  //   sucess: true,
  //   msg: `update a bootcamp ${req.params.id}`,
  // });
};
//@desc Get delete bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Public
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(
      req.params.id,
    );
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        msg: "abay delete nahi hoga temp",
      });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
