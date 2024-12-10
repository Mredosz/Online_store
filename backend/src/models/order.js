const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    homeNumber: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    deliveryType: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    cardNumber: {
      type: String,
    },
    cardExpiration: {
      type: String,
    },
    cvv: {
      type: String,
    },
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
