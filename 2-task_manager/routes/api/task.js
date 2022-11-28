const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController");

router.get("/", taskController.index);
router.post("/", taskController.store);

router.get("/:id", taskController.show);
router.patch("/:id", taskController.update);
router.delete("/:id", taskController.destroy);

module.exports = router;
