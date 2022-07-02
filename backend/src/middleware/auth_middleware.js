const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // add user to request object
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("الرمز الخاص بك غير صحيح");
    }
  }
});
module.exports = protect;
