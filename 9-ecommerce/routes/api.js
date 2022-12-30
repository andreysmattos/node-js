const router = require("express").Router();
const authenticateController = require("../controllers/authenticateController");

const PREFIX = "/auth";
const MIDDLEWARE = [];

router.post(`${PREFIX}/register`, authenticateController.register);
router.post(`${PREFIX}/login`, authenticateController.login);
router.get(`${PREFIX}/logout`, authenticateController.logout);

module.exports = router;
