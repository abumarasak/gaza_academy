const asuncHandler = require("express-async-handler");
const User = require("../user/model");
const sendVerificationEmail = require("../email_verification_otp");
const hashData = require("../../util/hashData");
const generateAccessToken = require("../../util/generateAccessToken");
const generateRefreshToken = require("../../util/generateRefreshToken");
const validEmail = require("../../util/validEmail");

// @desc signup user
// @route Posr /api/auth/signup
// @access Public
const signup = asuncHandler(async (req, res) => {
  const { name, email, password, city, address, gender, phoneNumber, image } =
    req.body;
  // check if user have all fields
  if (
    !name ||
    !email ||
    !password ||
    !city ||
    !address ||
    !gender ||
    !phoneNumber ||
    !image
  ) {
    res.status(401);
    throw new Error("الرجاء ادخال جميع الحقول");
  }
  // check if all fields not empty
  if (
    name === "" ||
    email === "" ||
    password === "" ||
    city === "" ||
    address === "" ||
    phoneNumber === "" ||
    image === ""
  ) {
    res.status(401);
    throw new Error("الرجاء ادخال جميع الحقول");
  }
  // check if user already exist
  const user = await User.findOne({ email });
  if (user) {
    res.status(401);
    throw new Error("البريد الإلكتروني مستخدم من قبل");
  }
  // check if phone number already exist
  const userPhone = await User.findOne({ phoneNumber });
  if (userPhone) {
    res.status(401);
    throw new Error("رقم الهاتف مستخدم من قبل");
  }
  // check if email is valid
  const isValidEmail = validEmail(email);
  if (!isValidEmail) {
    res.status(401);
    throw new Error("البريد الإلكتروني غير صالح");
  }
  // check if password is valid
  const isValidPassword = password.length >= 8;
  if (!isValidPassword) {
    res.status(401);
    throw new Error("كلمة المرور قصيرة جدا");
  }
  // hash password
  const hashedPassword = await hashData(password);
  if (!hashedPassword) {
    res.status(401);
    throw new Error("حدث خطأ ما");
  }
  // create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    city,
    address,
    phoneNumber,
    image,
    gender,
    isActive: false,
    isAdmin: false,
  });
  if (!newUser) {
    res.status(500);
    throw new Error("حدث خطأ ما");
  }
  // send verification email
  await sendVerificationEmail(newUser, res);
});
// @desc signin user
// @route Posr /api/auth/signin
// @access Public
const signin = asuncHandler(async (req, res) => {});
// @desc signout user
// @route Posr /api/auth/signout
// @access Public
const signout = asuncHandler(async (req, res) => {});

module.exports = {
  signup,
  signin,
  signout,
};
