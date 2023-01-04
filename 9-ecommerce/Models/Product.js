const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      trim: true,
      required: [true, "Please provide name"],
      maxlength: [100, "Name can not be more than 100 characteres"],
    },
    price: {
      type: "number",
      required: [true, "Please provide product price"],
      default: 0,
    },
    description: {
      type: "string",
      required: [true, "Please provide description"],
      maxlength: [1000, "Description can not be more than 100 characteres"],
    },
    image: { type: "string", default: "/uploads/example.jpeg" },
    category: {
      type: "string",
      enum: ["office", "kitchen", "bedroom"],
      required: [true, "Please provide product category"],
    },
    company: {
      type: "string",
      required: [true, "Please provide product company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: [true, "Please provide product category"],
    },
    featured: { type: "boolean", default: false },
    freeShipping: { type: "boolean", default: false },
    inventory: {
      type: "number",
      required: [true, "Please provide product inventory"],
      default: 15,
    },
    averageRating: { type: "number", default: 0 },
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
