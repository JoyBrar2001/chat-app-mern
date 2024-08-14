const express = require("express");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth.route");
const connectToMongoDB = require("./db/connectToMongo");

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening on PORT ${PORT}`);
});