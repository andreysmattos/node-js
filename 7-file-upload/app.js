require("dotenv").config();
require("express-async-errors");
const express = require("express");
const errorHandler = require("./middleware/error-handle");
const notFound = require("./middleware/not-found");
const database = require("./config/database");
const fileUpload = require("express-fileupload");

const api = require("./routes/api");

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(express.static('./public'))
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1> File upload </h1>");
});
app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    app.listen(port, () => {
      database(process.env.MONGO_URI);
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Warning");
  }
};

start();
