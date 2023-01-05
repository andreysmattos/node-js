const { StatusCodes } = require("http-status-codes");
const Product = require("../Models/Product");
const { BadRequest, Unanthenticated, NotFound } = require("../Exceptions");
const path = require("path");

const index = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const show = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) throw new NotFound(`No product with id: ${id}`);
  res.status(StatusCodes.OK).json({ product });
};

const store = async (req, res) => {
  const data = req.body;
  data.user_id = req.user._id;

  const product = await Product.create(data);

  res.status(StatusCodes.CREATED).json({ product });
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    category,
    company,
    colors,
    featured,
    freeShipping,
    inventory,
    averageRating,
  } = req.body;

  const product = await Product.findByIdAndUpdate(
    id,
    {
      name,
      price,
      description,
      category,
      company,
      colors,
      featured,
      freeShipping,
      inventory,
      averageRating,
    },
    { new: true, runValidators: true }
  );

  if (!product) throw new NotFound(`No product with id: ${id}`);
  res.status(StatusCodes.OK).json({ product });
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });

  if (!product) throw new NotFound(`No product with id: ${id}`);

  await product.remove();

  res.status(StatusCodes.OK).json();
};

const updateImage = async (req, res) => {
  if (!req.files) throw new BadRequest("No file Uploaded");

  const image = req.files.image;
  const imagePath = path.join(__dirname, `../public/uploads/${image.name}`);

  if (!image.mimetype.startsWith("image"))
    throw new BadRequest("Please upload an image");

  const maxSize = 1024 * 1024;

  if (image.size > maxSize) {
    throw new BadRequest("Please upload an image smaller than 1000");
  }

  await image.mv(imagePath);
 
  res.status(StatusCodes.OK).json({image: `/uploads/${image.name}`});
};

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
  updateImage,
};
