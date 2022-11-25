const Product = require("../models/product");

const index = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({products, qtd: products.length});
};

const indexStatic = async (req, res) => {
  const products = await Product.find({featured: true});

  res.status(200).json({products, qtd: products.length});
};

module.exports = {
  index,
  indexStatic,
};
