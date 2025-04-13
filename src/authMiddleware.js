// authmiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log("Decoded token:", decoded); // Log the decoded token
    req.userId = decoded.userId; // Store the user ID in the request object
    console.log("req.userId:", req.userId);   // Log the userId being set
    next();
  }); 
};

module.exports = authMiddleware;