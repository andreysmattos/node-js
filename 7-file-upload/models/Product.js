const mongoose = require("mongoose");

const PorductSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  price: {
    type: "number",
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("Product", PorductSchema);
