const router = require("express").Router();
const { auth, hasRole } = require("../middleware/auth");
const authenticateController = require("../controllers/authenticateController");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");

router.post(`/auth/register`, authenticateController.register);
router.post(`/auth/login`, authenticateController.login);
router.get(`/auth/logout`, authenticateController.logout);

router.get(`/users`, auth, hasRole("admin"), userController.index);
router.get(`/users/showMe`, auth, userController.showCurrent);
router.patch(`/users/current`, auth, userController.updateCurrent);
router.patch(
  `/users/current/password`,
  auth,
  userController.updateCurrentPassword
);
router.get(`/users/:id`, auth, userController.show);

router.get("/products", productController.index);
router.get("/products/:id", productController.show);

router.post("/products", auth, hasRole("admin"), productController.store);
router.patch("/products/:id", auth, hasRole("admin"), productController.update);
router.delete("/products/:id", auth, hasRole("admin"), productController.destroy);
router.post("/products/uploadImage", auth, hasRole("admin"), productController.updateImage);

module.exports = router;
