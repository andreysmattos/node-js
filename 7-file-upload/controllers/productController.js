const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const index = async (req, res) => {
  const products = await Product.find();
  res.status(StatusCodes.OK).json({ products });
};

const store = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

module.exports = { index, store };
