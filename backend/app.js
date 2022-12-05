const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");
app.use(express.json());
app.use(cookieParser());

//Router Imports

const job = require("./routes/jobRoutes");
const user = require("./routes/userRoutes");
app.use("/api/v1", user);
app.use("/api/v1", job);

//Middleware for the error
app.use(errorMiddleware);

module.exports = app;
