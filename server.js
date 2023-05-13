const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const connectDb = require("./config/db");
// load env vars
dotenv.config({ path: "./config/config.env" });
//Connect to database
connectDb();

//Rotue file
const bootcamps = require("./routes/bootcamps");
const app = express();
//Body parser
app.use(express.json()); //Without this we get undefined when we consolelog req.body
//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// app.use(logger);
//Mount rotuer

app.use("/api/v1/bootcamps", bootcamps);

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
