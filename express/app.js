const express = require("express");
const logger = require("./logger");
const authorize = require("./authorize");
const morgan = require("morgan");
const app = express();

// app.use([logger, authorize]);
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  return res.json({
    id: 1,
    name: "Shoes",
  });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
