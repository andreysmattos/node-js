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

router.post("/auth/register", authController.register);
router.patch("/auth/updateUser", authenticate, authController.updateUser);
router.post("/auth/login", authController.login);

module.exports = router;
