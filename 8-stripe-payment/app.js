require("dotenv").config();
require("express-async-errors");
const express = require("express");
const stripeController = require("./controllers/stripeController");

const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handle");

app.use(express.json());
app.use(express.static('./public'));

app.post("/stripe", stripeController.index);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  app.listen(port, () => {
    console.log(`Server is listen on port ${port}...`);
  });
};

start();
