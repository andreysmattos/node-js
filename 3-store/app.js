require("dotenv").config();
require('express-async-errors');

const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const apiRoutes = require("./routes/api");

// async errors

const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());

// routes
app.get("/", (req, res) => {
  return res.send(
    '<h1>Store API</h1> <a href="/api/v1/products"> Products</a>'
  );
});


app.use("/api/v1", apiRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listen to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
