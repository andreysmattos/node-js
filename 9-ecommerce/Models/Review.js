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

ReviewSchema.post(["remove", "create", "update", "save"], updateReviews);

async function updateReviews(next) {
  await this.model("Review").aggregate([
    {
      $match: {
        product_id: this.product_id,
      },
    },
    {
      $group: {
        _id: "$product_id",
        averageRating: { $avg: "$rating" },
      },
    },
    {
      $merge: {
        into: "products",
        on: "_id",
        whenNotMatched: "discard",
      },
    },
  ]);
}

module.exports = mongoose.model("Review", ReviewSchema);
