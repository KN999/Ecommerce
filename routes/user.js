const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/cart", userController.getCart);
router.patch("/cart", userController.updateCart);

module.exports = router;
