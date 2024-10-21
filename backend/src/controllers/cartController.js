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
  const products = req.body;
  try {
    const cartDb = await Cart.findOne({ userId });
    if (cartDb) {
      products.forEach((newProduct) => {
        const existingProduct = cartDb.products.find(
          ({ product }) => product._id === newProduct.product._id,
        );

        if (existingProduct) {
          existingProduct.quantity = newProduct.quantity;
        } else {
          cartDb.products.push(newProduct);
        }
      });
      await cartDb.save();
      res.status(201).json("Added to cart");
    } else {
      const newCart = new Cart({ products, userId });
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
    cart.products = cart.products.filter(
      (product) => product.productId !== productId,
    );
    await cart.save();
    res.status(200).json("Deleted from cart");
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};
