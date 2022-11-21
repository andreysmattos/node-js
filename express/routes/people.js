const express = require("express");
const morgan = require("morgan");
const router = express.Router();
const peopleController = require("../controllers/peopleController");

router.use(morgan("tiny"));

router.get("/", peopleController.get);
router.post("/", peopleController.store);
router.put("/:id", peopleController.update);
router.delete("/:id", peopleController.destroy);

module.exports = router;
