const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//config

dotenv.config({ path: "backend/config/config.env" });

// connection to the database

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

// Handling uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error:  ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  server.close(() => {
    process.exit(1);
  });
});

// Unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
