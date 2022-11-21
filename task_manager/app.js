require("dotenv").config();
const express = require("express");
// const taskRouter = require('./routes/api');
const apiRouter = require("./routes/api");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/v1", apiRouter);

// app.get("/", (req, res) => {
//   res.send("teste");
// });

app.listen(port, () => console.log(`Server is running on port: ${port}`));
