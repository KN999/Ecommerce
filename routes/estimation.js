const express = require("express");
const router = express.Router();
const estimationController = require("../controllers/estimation");

router.get("/:url", estimationController.getEstimation);
router.post("/", estimationController.addEstimation);

module.exports = router;
