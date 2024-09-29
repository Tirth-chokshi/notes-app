const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const handleSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 2; // 2 hours from now

    const token = jwt.sign(
      { sub: user._id, exp },
      process.env.SECRET
    );

    res.json({ auth: token, userID: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const handleLogout = async (req, res) => {
  try {
    req.user = null;
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
  }
};

const checkAuth = async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = { handleSignup, handleLogin, handleLogout, checkAuth };
