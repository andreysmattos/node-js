require("dotenv").config();
require("express-async-errors");

const morgan = require("morgan");
const helmet = require("helmet");
const raterLimiter = require("express-rate-limit");
const cors = require("cors");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const express = require("express");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const connectDB = require("./config/database");
const api = require("./routes/api");

const app = express();

const port = process.env.PORT || 5000;

app.set("trust proxy", 1);
app.use(
  raterLimiter({
    widowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
// app.use(morgan("tiny"));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SCRET));
app.use(fileUpload());

app.use(express.static("./public"));

app.use("/api/v1", api);

app.get("/", async (req, res) => {
  console.log(req.signedCookies);
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
