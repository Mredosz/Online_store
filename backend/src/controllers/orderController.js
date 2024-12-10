const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const checkErrors = require("../util/checkErrors");
const { getUserIdFromToken } = require("../util/tokenManager");
const sendEmail = require("../util/emailService");

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
    const { email, firstName, lastName } = await User.findById(userId);

    for (const { product, quantity } of order.products) {
      const productDb = await Product.findById(product._id);
      const newQuantity = productDb.availableQuantity - quantity;
      await Product.findByIdAndUpdate(productDb._id, {
        availableQuantity: newQuantity,
      });
    }
    await newOrder.save();
    res.status(201).json({ message: "Created" });
    await sendEmail(`${firstName} ${lastName} ${email}`);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.addPaymentToOrder = async (req, res) => {
  if (checkErrors(req, res)) return;
  const id = req.params.orderId;
  const payment = req.body;
  try {
    await Order.findByIdAndUpdate(id, {
      $set: {
        "address.paymentMethod": payment.paymentMethod,
        "address.cardNumber": payment.cardNumber,
        "address.cardExpiration": payment.cardExpiration,
        "address.cvv": payment.cvv,
      },
    });
    res.status(201).json({ message: "Added payment" });
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.addShippingToOrder = async (req, res) => {
  if (checkErrors(req, res)) return;
  const id = req.params.orderId;
  const address = req.body;

  try {
    await Order.findByIdAndUpdate(id, {
      $set: {
        "address.street": address.street,
        "address.city": address.city,
        "address.postalCode": address.postalCode,
        "address.homeNumber": address.homeNumber,
        "address.phoneNumber": address.phoneNumber,
        "address.deliveryType": address.deliveryType,
      },
    });
    res.status(201).json({ message: "Added address" });
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
    res.status(200).json({ message: "Updated" });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const report = await Order.aggregate([
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $group: {
          _id: "$products.product",
          totalQuantity: { $sum: "$products.quantity" },
          totalAmountSpent: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.price"],
            },
          },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          totalAmountSpent: 1,
          productDetails: { $arrayElemAt: ["$productDetails", 0] },
        },
      },
    ]);

    res.status(200).json(report);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
