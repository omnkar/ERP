const jwt = require("jsonwebtoken");

// ✅ Middleware to check if the user is authenticated
module.exports.authMiddleware = (req, res, next) => {
    console.log("cookies = ",req.cookies.token);
  let token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (token && token.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1);
  }
  console.log(token);
  if (!token) return res.status(401).json({ message: "Unauthorized access" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token has expired" });
    } else if (error.name === "NotBeforeError") {
      return res.status(403).json({ message: "Token not active" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Middleware to restrict access based on roles
module.exports.roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied. Insufficient permissions." });
  }
  next();
};
