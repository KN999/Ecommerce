const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory");
const { route } = require("./auth");

router.post("/items", inventoryController.addItem);
router.delete("/items/:itemName", inventoryController.removeItem);
router.get("/items/:itemName", inventoryController.findItem);

module.exports = router;