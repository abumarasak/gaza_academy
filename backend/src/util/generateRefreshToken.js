const jwt = require("jsonwebtoken");
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin, isActive: user.isActive },
    process.env.REFRESH_TOKEN_SECRET_KEY
  );
};
module.exports = generateRefreshToken;
