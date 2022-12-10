require("dotenv").config();
require("express-async-errors");
const connectDB = require('./db/connect');

const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handle");

const api = require("./routes/api");

const app = express();
app.use(express.json());

// routes
app.use("/api", api);

// error handler
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {}
};

start();
