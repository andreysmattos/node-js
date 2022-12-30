require("dotenv").config();
require("express-async-errors");

const morgan = require("morgan");
const express = require("express");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const connectDB = require("./config/database");
const api = require("./routes/api");

const app = express();

const port = process.env.PORT || 5000;

app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/v1", api);

app.get("/", async (req, res) => {
  return res.status(200).send("Work");
});

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server listen on port ${port}`));
  } catch (error) {
    console.log("Start error", error);
  }
};

start();
