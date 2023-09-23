const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/cart", userController.addToCart);
router.get("/cart", userController.getCart);
router.put("/cart", userController.updateCart);
router.delete("/cart/:itemName", userController.deleteFromCart);

module.exports = router;
