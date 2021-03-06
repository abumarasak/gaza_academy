const asuncHandler = require("express-async-handler");
const User = require("../user/model");
const emailVerificationOtp = require("../email_verification_otp");
const { hashData, verifyHashedData } = require("../../util/bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../util/token");
const RefreshToken = require("../refresh_token/model");
const validEmail = require("../../util/validEmail");
const {uploadFile} = require("../../util/s3");
const util = require("util");
const unlinkFile = util.promisify(require("fs").unlink);
const validImage = require("../../util/validImage");
const validPhoneNumber = require("../../util/validPhoneNumber");
// @desc signup user
// @route Posr /api/auth/signup
// @access Public
const signup = asuncHandler(async (req, res) => {
  const { name, email, password, city, address, gender, phoneNumber } =
    req.body;
  // check if user have all fields
  if (
    !name ||
    !email ||
    !password ||
    !city ||
    !address ||
    !gender ||
    !phoneNumber 
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
    phoneNumber === "" 
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
  // check if phoneNumber is valid
  const isValidPhoneNumber =await validPhoneNumber(phoneNumber);
  if (!isValidPhoneNumber) {
    res.status(401);
    throw new Error("رقم الهاتف غير صحيح");
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
  // check if image is valid
   
  if(!req.file){
    res.status(401);
    throw new Error("الرجاء رفع صورة");
  }
  const isValidImage = await validImage(req.file);
  if (!isValidImage) {
    res.status(401);
    throw new Error("الصورة غير صالحة");
  }
  // upload image
  const imageUrl = await uploadFile(req.file);
  
  if(!imageUrl){
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
    gender,
    image : imageUrl.Key,
    isActive: false,
    isAdmin: false,
  });
  if (!newUser) {
    res.status(500);
    throw new Error("حدث خطأ ما");
  }
  await unlinkFile(req.file.path)
  // send verification email
  await emailVerificationOtp(newUser, res);
});
// @desc signin user
// @route Posr /api/auth/signin
// @access Public
const signin = asuncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user have all fields
  if (!email || !password) {
    res.status(401);
    throw new Error("الرجاء ادخال جميع الحقول");
  }
  // check if all fields not empty
  if (email === "" || password === "") {
    res.status(401);
    throw new Error("الرجاء ادخال جميع الحقول");
  }
  // check if user already exist
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("البريد الإلكتروني او كلمة المرور غير صحيحة");
  }
  // check if password is valid
  const isValidPassword = await verifyHashedData(password, user.password);
  if (!isValidPassword) {
    res.status(401);
    throw new Error("البريد الإلكتروني او كلمة المرور غير صحيحة");
  }
  // check if user is active
  if (!user.isActive) {
    res.status(401);
    throw new Error("الحساب غير مفعل الرجاء تفعيل الحساب");
  }
  // generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  // save refresh token
  const newRefreshToken = await RefreshToken.create({
    refreshToken,
    userId: user._id,
  });
  if (!newRefreshToken) {
    res.status(500);
    throw new Error("حدث خطأ ما");
  }
  
  // send response
  res.status(200).json({
    accessToken,
    refreshToken,
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
// @desc signout user
// @route Posr /api/auth/signout
// @access Public
const signout = asuncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  // check if user have all fields
  if (!refreshToken) {
    res.status(401);
    throw new Error("الرجاء ادخال جميع الحقول");
  }
  // check if all fields not empty
  if (refreshToken === "") {
    res.status(401);
    throw new Error("الرجاء ادخال جميع الحقول");
  }
  // check if refresh token exist
  const refreshTokenExist = await RefreshToken.findOne({
    refreshToken,
  });
  if (!refreshTokenExist) {
    res.status(401);
    throw new Error("الرجاء تسجيل الدخول للمتابعة");
  }
  // delete refresh token
  const deletedRefreshToken = await RefreshToken.deleteOne({
    refreshToken,
  });
  if (!deletedRefreshToken) {
    res.status(500);
    throw new Error("حدث خطأ ما");
  }
  // send response
  res.status(200).json({
    message: "تم تسجيل الخروج بنجاح",
  });
});



module.exports = {
  signup,
  signin,
  signout,
};
