const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://andreysmattos:andreysmattos@cluster0.sie7udk.mongodb.net/task_manager?retryWrites=true&w=majority";

const connectDB = (url) => {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;