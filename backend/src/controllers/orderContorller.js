const Order = require("../models/order");
const checkErrors = require("../util/checkErrors");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    const order = await Order.findById(orderId);
    res.status(200).json(order);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.addOrder = async (req, res) => {
  if (checkErrors(req, res)) return;
  const order = req.body;
  const newOrder = new Order(order);
  try {
    await newOrder.save();
    res.status(201).json("Created");
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};
