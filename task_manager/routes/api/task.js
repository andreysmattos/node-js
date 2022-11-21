const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController");

router.get("/", taskController.get);
router.post("/", taskController.store);

module.exports = router;
