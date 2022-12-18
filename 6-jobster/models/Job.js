const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide a position name"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide an user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
