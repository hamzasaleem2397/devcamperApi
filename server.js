const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const morgan = require("morgan");
//Rotue file
const bootcamps = require("./routes/bootcamps");
// load env vars
dotenv.config({ path: "./config/config.env" });
const app = express();
//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// app.use(logger);
//Mount rotuer

app.use("/api/v1/bootcamps", bootcamps);
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `SERVER running ${process.env.NODE_ENV} mode on PORT ${PORT}`,
  ),
);
