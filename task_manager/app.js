require("dotenv").config();
const express = require("express");

const connectDB = require("./db/connect");

// const taskRouter = require('./routes/api');
const apiRouter = require("./routes/api");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/v1", apiRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
