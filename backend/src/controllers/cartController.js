const Cart = require("../models/cart");
const checkErrors = require("../util/checkErrors");
const { getUserIdFromToken } = require("../util/tokenManager");

exports.getCartById = async (req, res) => {
  const userId = getUserIdFromToken(req, res);

  try {
    const cart = await Cart.findOne({ userId });
    res.status(200).json(cart);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.addToCart = async (req, res) => {
  if (checkErrors(req, res)) return;
  const userId = getUserIdFromToken(req, res);
  const cart = req.body;

  try {
    const cartDb = await Cart.findOne({ userId });
    if (cartDb) {
      cartDb.products = cart.products;
      await cartDb.save();
      res.status(201).json({ message: "Added to cart" });
    } else {
      const newCart = new Cart({ ...cart, userId });
      await newCart.save();
      res.status(201).json({ message: "Added to cart" });
    }
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.deleteFromCart = async (req, res) => {
  const productId = req.params.productId;
  const userId = getUserIdFromToken(req, res);

  try {
    const cart = await Cart.findOne({ userId });
    cart.products = cart.products.filter(
      ({ product }) => product._id !== productId,
    );
    await cart.save();
    res.status(200).json({ message: "Deleted from cart" });
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.deleteCart = async (req, res) => {
  const userId = getUserIdFromToken(req, res);

  try {
    const cart = await Cart.findOne({ userId });
    await cart.deleteOne();
    res.status(200).json({ message: "Cart delete successfully" });
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};
