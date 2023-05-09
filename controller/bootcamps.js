//@desc Get all bottcamos
//@route Get /api/v1/bootcamps
//@access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).send({
    sucess: true,
    msg: `Show all bootcamps ${req.params.id}`,
  });
};
//@desc Get single bottcamos
//@route Get /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).send({
    sucess: true,
    msg: `Show  bootcamps `,
  });
};
//@desc Get create bottcamp
//@route Post /api/v1/bootcamps/:id
//@access Public
  res
    .status(200)
    .send({ sucess: false, msg: "create new bootcamps" });
};
//@desc Get update bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Public
exports.updateBootcamp = (req, res, next) => {
  res.status(200).send({
    sucess: true,
    msg: `update a bootcamp ${req.params.id}`,
  });
};
//@desc Get delete bootcamp
//@route Get /api/v1/bootcamps/:id
//@access Public
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).send({
    sucess: false,
    msg: `delete a bootcamp ${req.params.id}`,
  });
};
