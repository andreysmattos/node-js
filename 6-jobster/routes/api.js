const express = require("express");
const jobController = require("../controllers/jobController");
const authController = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/jobs", authenticate, jobController.index);
router.post("/jobs", authenticate, jobController.store);
router.get("/jobs/:id", authenticate, jobController.show);
router.patch("/jobs/:id", authenticate, jobController.update);
router.delete("/jobs/:id", authenticate, jobController.destroy);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
