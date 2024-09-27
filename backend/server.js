const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const { app, server } = require("./socket/socket");
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");
const userRoutes = require("./routes/user.route");
const connectToMongoDB = require("./db/connectToMongo");

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening on PORT ${PORT}`);
});