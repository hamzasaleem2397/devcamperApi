const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
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
const reviews = require("./routes/reviews");
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

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent Xss attack
app.use(xss());

//Enable CORS
app.use(cors());

//Rate Limiting
const limiter = rateLimit({
  windowMS: 10 * 60 * 100, // 10 mins
  max: 1,
});
app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount rotuer
app.use("/api/v1/auth", auth);
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
app.get("/", (req, res) => {
  res.redirect(
    "https://documenter.getpostman.com/view/15368681/2s93m4Xhb1",
  );
});
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
