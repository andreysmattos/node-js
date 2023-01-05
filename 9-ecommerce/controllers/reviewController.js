const Review = require("../Models/Review");
const Product = require("../Models/Product");
const checkPermission = require("../utils/checkPermission");
const { BadRequest, NotFound } = require("../Exceptions");
const { StatusCodes } = require("http-status-codes");

const index = async (req, res) => {
  const reviews = await Review.find({});

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
const show = async (req, res) => {
  const { id } = req.params;
  // checkPermission(req.user, id);
  const review = await Review.findOne({ _id: id });
  if (!review) throw new NotFound(`No review with id: ${id}`);

  res.status(StatusCodes.OK).json({ review });
};

const store = async (req, res) => {
  const { product_id } = req.body;

  if (!product_id) throw BadRequest("Provide product_id");

  const product = await Product.findById(product_id);

  if (!product) throw BadRequest("Provide valid product");

  const data = req.body;

  data.user_id = req.user._id;

  const review = await Review.create(data);

  res.status(StatusCodes.CREATED).json({ review });
};

const update = async (req, res) => {
  const { id } = req.params;
  checkPermission(req.user, id);
  const { rating, title, comment } = req.body;

  checkPermission(req.user, id);
  const review = await Review.findOne({ _id: id });
  if (!review) throw new NotFound(`No review with id: ${id}`);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();

  res.status(StatusCodes.OK).json({ review });
};
const destroy = async (req, res) => {
  const { id } = req.params;
  checkPermission(req.user, id);
  const review = await Review.findOne({ _id: id });

  if (!review) throw new NotFound(`No review with id: ${id}`);

  await review.remove();

  res.status(StatusCodes.OK).json();
};

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
