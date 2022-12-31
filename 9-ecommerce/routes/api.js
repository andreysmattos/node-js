const router = require("express").Router();
const { auth, hasRole } = require("../middleware/auth");
const authenticateController = require("../controllers/authenticateController");
const userController = require("../controllers/userController");

router.post(`/auth/register`, authenticateController.register);
router.post(`/auth/login`, authenticateController.login);
router.get(`/auth/logout`, authenticateController.logout);

router.get(`/users`, auth, hasRole("admin", "manager"), userController.index);
router.get(`/users/current`, userController.showCurrent);
router.patch(`/users/current`, userController.updateCurrent);
router.patch(`/users/current/password`, userController.updateCurrentPassword);

router.get(`/users/:id`, userController.show);

module.exports = router;
