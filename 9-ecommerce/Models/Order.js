const mongoose = require("mongoose");

const SingleOrderItemSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  image: { type: "string", required: true },
  price: { type: "number", required: true },
  amount: { type: "number", required: true },
  product_id: { type: mongoose.Types.ObjectId, ref: "Product" },
});

const OrderSchema = new mongoose.Schema(
  {
    tax: { type: "number", required: true },
    shippingFee: { type: "number", required: true },
    subtotal: { type: "number", required: true },
    total: { type: "number", required: true },
    orderItems: { type: [SingleOrderItemSchema] },
    status: {
      type: "string",
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    client_secret: {
      type: "string",
      required: true,
    },
    payment_intent_id: { type: "string" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
