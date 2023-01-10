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

ReviewSchema.statics.calculateAverageRating = async function (product_id) {
  const result = await this.model("Review").aggregate([
    {
      $match: {
        product_id,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: product_id },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: Math.ceil(result[0]?.numOfReviews || 0),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product_id);
  console.log("save hook");
});

ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.product_id);
  console.log("remove hook");
});
ReviewSchema.post("update", async function () {
  await this.constructor.calculateAverageRating(this.product_id);
  console.log("update hook");
});

module.exports = mongoose.model("Review", ReviewSchema);
