const router = require("express").Router();
const { auth, hasRole } = require("../middleware/auth");
const authenticateController = require("../controllers/authenticateController");
const userController = require("../controllers/userController");

router.post(`/auth/register`, authenticateController.register);
router.post(`/auth/login`, authenticateController.login);
router.get(`/auth/logout`, authenticateController.logout);

router.get(`/users`, auth, hasRole("admin", "manager"), userController.index);
router.get(`/users/showMe`, auth, userController.showCurrent);
router.patch(`/users/current`, auth, userController.updateCurrent);
router.patch(`/users/current/password`, auth, userController.updateCurrentPassword);

router.get(`/users/:id`, auth, hasRole("admin", "manager"), userController.show);

module.exports = router;
