const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: "number",
      min: 1,
      max: 5,
      require: [true, "Please provide rating"],
    },
    title: {
      type: "string",
      maxlength: 100,
      require: [true, "Please provide title"],
    },
    comment: {
      type: "string",
      require: [true, "Please provide comment"],
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: 1 });

module.exports = mongoose.model("Review", ReviewSchema);
