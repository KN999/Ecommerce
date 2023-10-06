const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const inventoryRoutes = require("./routes/inventory");
const estimateRoutes = require("./routes/estimate");
const { extractToken } = require("./utils/util");
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/cart", extractToken, cartRoutes);
app.use("/api/inventory", extractToken, inventoryRoutes);
app.use("/api/estimate", extractToken, estimateRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});