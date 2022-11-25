const express = require("express");
const productController = require('../controllers/productController');

const router = express.Router();

router.get("/products", productController.index);
router.get("/products/static", productController.indexStatic);

module.exports = router;
