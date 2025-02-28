const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  availableQuantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  specifications: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
