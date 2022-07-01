const jwt = require("jsonwebtoken");
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin, isActive: user.isActive },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRATION_TIME }
  );
};
module.exports = generateAccessToken;
