const { StatusCodes } = require("http-status-codes");
const Product = require("../Models/Product");
const Order = require("../Models/Order");
const { BadRequest, Unanthenticated, NotFound } = require("../Exceptions");
const checkPermission = require("../utils/checkPermission");

const index = async (req, res) => {
  const orders = await Order.find({});

  return res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const currents = async (req, res) => {
  const orders = await Order.find({ user_id: req.user._id });

  return res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const show = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });
  if (!order) throw new NotFound("Order does not exists");

  checkPermission(req.user, order.user_id);

  return res.status(StatusCodes.OK).json({ order });
};

const store = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequest("No cart items provided");
  }

  if (!tax || !shippingFee) {
    throw new BadRequest("Please provide tax and shipping fee");
  }

  let orderItems = [];
  let subtotal = 0;

  for (const cartItem of cartItems) {
    const product = await Product.findOne({ _id: cartItem.product });
    if (!product)
      throw new BadRequest(`Product id:"${cartItem.product}" is incorrect`);

    const { name, price, image, _id } = product;

    orderItems.push({
      product: _id,
      name,
      image,
      price,
      amount: cartItem.amount,
    });
    subtotal += product.price * cartItem.amount;
  }

  const total = subtotal + tax + shippingFee;

  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    client_secret: paymentIntent.client_secret,
    user_id: req.user._id,
  });

  return res
    .status(StatusCodes.OK)
    .json({ order, client_secret: order.client_secret });
};
const update = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });

  if (!order) throw new NotFound("Order does not exists");

  checkPermission(req.user, order.user_id);

  order.status = "paid";
  order.payment_intent_id = req.body.payment_intent_id;
  await order.save();

  return res.status(StatusCodes.OK).json({ order });
};

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = "someRandomValue";
  return { client_secret, amount };
};

module.exports = {
  index,
  show,
  currents,
  store,
  update,
};
