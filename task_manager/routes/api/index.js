const express = require("express");
const router = express.Router();
const task = require("./task");

router.use("/tasks", task);

module.exports = router;
