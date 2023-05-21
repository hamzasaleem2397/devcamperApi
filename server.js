const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const connectDb = require("./config/db");
// load env vars
dotenv.config({ path: "./config/config.env" });
//Connect to database
connectDb();

//Route file

const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const app = express();

//Body parser

app.use(express.json()); //Without this we get undefined when we consolelog req.body
//Cookie parser
app.use(cookieParser());

//Dev logging middleware

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//File uploading
app.use(fileupload());

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount rotuer
app.use("/api/v1/auth", auth);
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/users", users);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `SERVER running ${process.env.NODE_ENV} mode on PORT ${PORT}`
      .yellow.bold,
  ),
);
//Handle unhandleed promiss rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`.red);

  //Close server & exit process
  server.close(() => promise.exit(1));
});
