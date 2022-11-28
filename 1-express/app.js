const express = require("express");
const app = express();
const peopleRoute = require("./routes/people");
const authRoute = require("./routes/auth");

app.use(express.json());

app.use("/api", peopleRoute);
app.use("/auth", authRoute);

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
