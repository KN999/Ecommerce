const cartService = require("../services/cart");

async function addToCart(req, res) {
  return cartService.addToCart(req, res);
}

async function getCart(req, res) {
  return cartService.getCart(req, res);
}

async function updateCart(req, res) {
  return cartService.updateCart(req, res);
}

async function deleteFromCart(req, res) {
  return cartService.deleteFromCart(req, res);
}

module.exports = { 
  addToCart,
  getCart,
  updateCart,
  deleteFromCart
};
