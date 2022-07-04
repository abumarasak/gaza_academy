const RefreshToken = require("./model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../util/token");
const User = require("../user/model");
const asuncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const refresh_token = asuncHandler(async (req, res) => {
  const { token } = req.body;
  // check if have the token
  if (!token) {
    res.status(401);
    throw new Error("الرجاء ادخال جميع الحقول");
  }

  // check if token not empty
  if (token === "") {
    res.status(401);
    throw new Error("الرجاء ادخال جميع الحقول");
  }
  const refreshToken = await RefreshToken.findOne({ refreshToken: token });
  if (!refreshToken) {
    res.status(401);
    throw new Error("رمز التحديث غير صالح");
  }
  const user = await User.findOne({ _id: refreshToken.userId });
  if (!user) {
    res.status(401);
    throw new Error("المستخدم غير موجود");
  }
  // verify the token
  const isVerified = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
  if (!isVerified) {
    res.status(401);
    throw new Error("رمز التحديث غير صالح");
  }
  // Delete the refresh token
  const deletedRefreshTOken = await RefreshToken.deleteOne({
    refreshToken: token,
  });
  if (!deletedRefreshTOken) {
    res.status(401);
    throw new Error("الرجاء إعادة تسجيل الدخول");
  }
  // generate new access token
  const accessToken = generateAccessToken(user);
  // generate new refresh token
  const newRefreshToken = generateRefreshToken(user);
  // save new refresh token
  const newRefreshTokenObj = RefreshToken.create({
    refreshToken: newRefreshToken,
    userId: user._id,
  });
  if (!newRefreshTokenObj) {
    res.status(401);
    throw new Error("الرجاء إعادة تسجيل الدخول");
  }
  // send the response
  res.status(200).json({
    accessToken,
    refreshToken: newRefreshToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      address: user.address,
      phoneNumber: user.phoneNumber,
      image: user.image,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
    },
  });
});
module.exports = { refresh_token };
