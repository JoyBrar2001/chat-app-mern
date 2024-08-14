const express = require("express");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth.route");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
});