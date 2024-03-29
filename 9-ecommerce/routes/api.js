const router = require("express").Router();
const { auth, hasRole } = require("../middleware/auth");
const authenticateController = require("../controllers/authenticateController");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController");
const orderController = require("../controllers/orderController");

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

router.get("/products/:id/reviews", auth, reviewController.showByProduct);

router.get("/products", productController.index);
router.get("/products/:id", productController.show);

router.post("/products", auth, hasRole("admin"), productController.store);
router.patch("/products/:id", auth, hasRole("admin"), productController.update);
router.delete(
  "/products/:id",
  auth,
  hasRole("admin"),
  productController.destroy
);
router.post(
  "/products/uploadImage",
  auth,
  hasRole("admin"),
  productController.updateImage
);

router.get("/reviews", reviewController.index);
router.get("/reviews/:id", reviewController.show);

router.post("/reviews", auth, reviewController.store);
router.patch("/reviews/:id", auth, reviewController.update);
router.delete("/reviews/:id", auth, reviewController.destroy);

router.get("/orders", auth, hasRole("admin"), orderController.index);

router.get("/orders/showAllMyOrders", auth, orderController.currents);
router.post("/orders", auth, orderController.store);
router.get("/orders/:id", auth, orderController.show);
router.patch("/orders/:id", auth, orderController.update);

module.exports = router;
