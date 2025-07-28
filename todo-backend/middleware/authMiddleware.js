const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  //   console.log("authHeader =>", JSON.stringify(authHeader, null, 2));

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(404).json({
      status: 404,
      message: "Unauthoraized. No token provided",
    });
  }

  const token = authHeader.split(" ")[1]; // remove "Bearer "
  //   console.log("token =>", JSON.stringify(token, null, 2));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded =>", JSON.stringify(decoded, null, 2));

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
