const express = require("express");
const authMiddleware = require("../middleware/auth");
const mainController = require("../controllers/main");

const router = express.Router();

router.post("/login", mainController.login);
router.get("/dashboard", authMiddleware, mainController.dashboard);

module.exports = router;
