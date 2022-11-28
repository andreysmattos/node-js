const express = require("express");
const mainController = require("../controllers/main");

const router = express.Router();

router.post("/login", mainController.login);
router.get("/dashboard", mainController.dashboard);

module.exports = router;
