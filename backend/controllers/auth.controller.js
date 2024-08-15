const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const generateTokenAndSetCookie = require("../utils/generateToken");

const signup = async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;

  try {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res
        .status(400)
        .json({
          success: false,
          error: "All Fields are required (fullName, username, password, confirmPassword, gender)",
        });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Passwords do not match",
        });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Username already exists",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateToken(newUser._id, res);

      await newUser.save();

      return res
        .status(201)
        .json({
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic,
        });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          error: "Invalid user data",
        });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);

    return res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
}

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({
          success: false,
          error: "All Fields are required (username, password)",
        });
    }

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordCorrect) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Invalid username or password",
        });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      success: true,
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);

    return res
      .status(500)
      .json({
        success: false,
        error: "Internal Server Error",
      });
  }
}

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });

    return res
      .status(200)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    console.log("Error in logout controller", error.message);

    return res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
}

module.exports = { signup, login, logout };