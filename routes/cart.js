const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router.get("", cartController.getCart);
router.patch("", cartController.updateCart);

module.exports = router;
