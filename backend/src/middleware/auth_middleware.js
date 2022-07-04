const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      const token = req.headers.authorization.split(" ")[1];
      // verify token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
      // add user to request object
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("الرمز الخاص بك غير صحيح");
    }
  } else {
    res.status(401);
    throw new Error("الرجاء تسجيل الدخول");
  }
});
module.exports = { protect };
