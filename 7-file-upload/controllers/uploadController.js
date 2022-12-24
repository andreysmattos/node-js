const Product = require("../models/Product");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const customErros = require("../exceptions");

const uploadProductImage = async (req, res) => {
  if (!req.files) {
    throw new customErros.BadRequestError("no file uploaded");
  }

  const image = req.files.image;
  const imagePath = path.join(__dirname, `../public/files/${image.name}`);
  console.log("image.mimetype", image);
  if (!image.mimetype.startsWith("image")) {
    throw new customErros.BadRequestError("Please upload an image");
  }

  const maxSize = 1024 * 5;

  if (image.size > maxSize) {
    throw new customErros.BadRequestError(
      "Please upload an image smaller than 1000"
    );
  }

  await image.mv(imagePath);

  res.status(StatusCodes.OK).json({ image: { src: `/files/${image.name}` } });
};

module.exports = { uploadProductImage };
