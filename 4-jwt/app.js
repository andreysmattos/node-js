require("dotenv").config();
require("express-async-errors");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use("/api/v1", apiRoutes);
// app.use("", webRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
