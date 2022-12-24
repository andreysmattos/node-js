const express = require("express");
const Router = express.Router();

const productController = require("../controllers/productController");
const uploadController = require("../controllers/uploadController");

Router.get("/products", productController.index);
Router.post("/products", productController.store);
Router.post("/products/uploads", uploadController.uploadProductImage);

module.exports = Router;
