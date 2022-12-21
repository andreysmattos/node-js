const express = require("express");
const jobController = require("../controllers/jobController");
const authController = require("../controllers/authController");
const authenticate = require("../middleware/authenticate");
const testUser = require("../middleware/testUser");

const router = express.Router();

router.get("/jobs/stats", authenticate, jobController.showStats);
router.get("/jobs", authenticate, jobController.index);
router.get("/jobs/:id", authenticate, jobController.show);
router.post("/jobs", authenticate, testUser, jobController.store);
router.patch("/jobs/:id", authenticate, testUser, jobController.update);
router.delete("/jobs/:id", authenticate, testUser, jobController.destroy);

router.post("/auth/register", authController.register);
router.patch(
  "/auth/updateUser",
  authenticate,
  testUser,
  authController.updateUser
);
router.post("/auth/login", authController.login);

module.exports = router;
