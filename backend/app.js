const express = require("express");

const app = express();
const errorMiddleware = require("./middleware/error");
app.use(express.json());

//Router Imports

const product = require("./routes/jobRoutes");

app.use("/api/v1", product);

//Middleware for the error
app.use(errorMiddleware);

module.exports = app;
