const Cart = require("../models/cart");
const checkErrors = require("../util/checkErrors");

exports.getCartById = async (req, res) => {
  const userId = req.query.userId;
  try {
    const cart = await Cart.findOne({ userId });
    res.status(200).json(cart);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

exports.addToCart = async (req, res) => {
  if (checkErrors(req, res)) return;
  const cart = req.body;
  try {
    const cartDb = await Cart.findOne({ userId: cart.userId });
    if (cartDb) {
      cartDb.products.push(cart.products[0]);
      await cartDb.save();
      res.status(201).json("Added to cart");
    } else {
      const newCart = new Cart(cart);
      await newCart.save();
      res.status(201).json("Added to cart");
    }
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

exports.deleteFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    const products = cart.products.filter(
      (product) => product.productId !== productId,
    );
    cart.products = products;
    await cart.save();
    res.status(200).json("Deleted from cart");
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};
