const fs = require("fs");

const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//load models
const Bootcamp = require("./modals/Bootcamps");
const Course = require("./modals/Course");
const User = require("./modals/User");
const Reviews = require("./modals/Reviews");

// Connect to DB

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

//ReadJson JSON file
const bootcamps = JSON.parse(
  fs.readFileSync(
    `${__dirname}/_data/bootcamps.json`,
    "utf-8",
  ),
);
const courses = JSON.parse(
  fs.readFileSync(
    `${__dirname}/_data/courses.json`,
    "utf-8",
  ),
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8"),
);
const reviews = JSON.parse(
  fs.readFileSync(
    `${__dirname}/_data/reviews.json`,
    "utf-8",
  ),
);

//Import into Db
const importData = async () => {
  try {
    await Course.create(courses);
    await User.create(users);
    await Bootcamp.create(bootcamps);
    await Reviews.create(reviews);
    console.log("DATA IMPORTED.....".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//Delete data
const deleteData = async () => {
  try {
    await Course.deleteMany();
    await User.deleteMany();
    await Bootcamp.deleteMany();
    await Reviews.deleteMany();
    console.log("DATA Destroyed.....".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
