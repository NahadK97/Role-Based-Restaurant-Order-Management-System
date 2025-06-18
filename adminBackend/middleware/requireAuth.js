const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id RID");
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

// // Grant access to specific roles
// exports.authorize = (...roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         return res.status(403).json({
//           success: false,
//           message: `User role ${req.user.role} is not authorized to access this route`
//         });
//       }
//       next();
//     };
//   };

module.exports = requireAuth;
