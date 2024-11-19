const Order = require("../models/order");
const Product = require("../models/product");
const checkErrors = require("../util/checkErrors");
const { getUserIdFromToken } = require("../util/tokenManager");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId");
    res.status(200).json(orders);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId)
      .populate("userId")
      .populate("products.product");
    res.status(200).json(order);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.addOrder = async (req, res) => {
  if (checkErrors(req, res)) return;
  const userId = getUserIdFromToken(req, res);
  const order = req.body;
  const newOrder = new Order({
    ...order,
    date: new Date(),
    userId,
    status: "Processing",
  });
  try {
    for (const { product, quantity } of order.products) {
      const newQuantity = product.availableQuantity - quantity;
      await Product.findByIdAndUpdate(product._id, {
        availableQuantity: newQuantity,
      });
    }

    await newOrder.save();
    res.status(201).json("Created");
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.changeOrderStatus = async (req, res) => {
  if (checkErrors(req, res)) return;
  const orderId = req.params.orderId;
  const status = req.body.status;

  try {
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json("Updated");
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
