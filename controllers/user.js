const userService = require("../services/user");

async function addToCart(req, res) {
  return userService.addToCart(req, res);
}

async function getCart(req, res) {
  return userService.getCart(req, res);
}

async function updateCart(req, res) {
  return userService.updateCart(req, res);
}

async function deleteFromCart(req, res) {
  return userService.deleteFromCart(req, res);
}

module.exports = { 
  addToCart,
  getCart,
  updateCart,
  deleteFromCart
};
