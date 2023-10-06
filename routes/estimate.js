const express = require("express");
const router = express.Router();
const estimateController = require("../controllers/estimate");

router.get("/:url", estimateController.getEstimate);
router.post("/", estimateController.addEstimate);

module.exports = router;
