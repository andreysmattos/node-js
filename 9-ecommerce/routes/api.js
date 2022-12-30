const router = require("express").Router();
const authenticateController = require("../controllers/authenticateController");

router.post(`/auth/register`, authenticateController.register);
router.post(`/auth/login`, authenticateController.login);
router.get(`/auth/logout`, authenticateController.logout);

module.exports = router;
