const express = require("express");
const jobController = require("../controllers/jobController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/jobs", jobController.index);
router.post("/jobs", jobController.store);
router.get("/jobs/:id", jobController.show);
router.patch("/jobs/:id", jobController.update);
router.delete("/jobs/:id", jobController.destroy);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
