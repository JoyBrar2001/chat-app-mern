const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const { getUsersForSiderbar } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", protectRoute, getUsersForSiderbar);

module.exports = router;