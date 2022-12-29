require("dotenv").config();
require("express-async-errors");
const express = require("express");
const sendEmail = require('./controllers/sendEmail');

const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handle");

app.use(express.json());

app.get("/", sendEmail.index);

app.get("/send", sendEmail.send)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  app.listen(port, () => {
    console.log(`Server is listen on port ${port}...`);
  });
};

start();
