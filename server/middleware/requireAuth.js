const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

async function requireAuth(req, res, next) {
  try {
    console.log("inside the require auth");
    const authHeader = req.headers.authorization;
    console.log(req.headers);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("No token or invalid token format");
      return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.SECRET);

    if (Date.now() > decoded.exp * 1000) {  // Convert exp to milliseconds
      console.log("expired token");
      return res.sendStatus(401);
    }

    const user = await User.findById(decoded.sub);
    if (!user) {
      console.log("no user");
      return res.sendStatus(401);
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = requireAuth;