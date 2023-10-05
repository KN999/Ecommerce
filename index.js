const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const inventoryRoutes = require("./routes/inventory");
const estimationRoutes = require("./routes/estimation");
const { extractToken } = require("./utils/util");
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user", extractToken, userRoutes);
app.use("/api/inventory", extractToken, inventoryRoutes);
app.use("/api/estimation", extractToken, estimationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});