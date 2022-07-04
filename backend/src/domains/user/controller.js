const asuncHandler = require("express-async-handler");
const User = require("./model");
const RefreshToken = require("../refresh_token/model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../util/token");
const { hashData } = require("../../util/bcrypt");
const validEmail = require("../../util/validEmail");
const emailVerificationOtp = require("../email_verification_otp");

// @desc get user by id
// @route get /api/user/:id
// @access Private
const getUserById = asuncHandler(async (req, res) => {
  const id = req.params.id;
  // check if id is valid
  if (!id) {
    res.status(400);
    throw new Error("الرجاء ادخال المعرف");
  }
  // check if user if admin
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error("ليس لديك الصلاحيات الكافية");
  }
  // get user by id
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("المستخدم غير موجود");
  }
  // send the response
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    city: user.city,
    address: user.address,
    phoneNumber: user.phoneNumber,
    image: user.image,
    isAdmin: user.isAdmin,
    isActive: user.isActive,
  });
});
// @desc get all users
// @route get /api/user/
// @access Private
const getAllUsers = asuncHandler(async (req, res) => {
  // check if user if admin
  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error("ليس لديك الصلاحيات الكافية");
  }
  // get all users without password
  const users = await User.find(
    {},
    { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }
  );
  // check if users more than 0
  if (users.length === 0) {
    res.status(404);
    throw new Error("لا يوجد مستخدمين");
  }
  // send the response
  res.status(200).json(users);
});
// @desc delete user by id
// @route delete /api/user/id
// @access Private
const deleteUserById = asuncHandler(async (req, res) => {
  const id = req.params.id;
  // check if id is valid
  if (!id) {
    res.status(400);
    throw new Error("الرجاء ادخال المعرف");
  }
  // check if user have axcess to delete user
  if (req.user.id !== id && !req.user.isAdmin) {
    res.status(401);
    throw new Error("ليس لديك الصلاحيات الكافية");
  }
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("المستخدم غير موجود");
  }
  // delete user
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    res.status(404);
    throw new Error("المستخدم غير موجود");
  }
  // send the response
  res.status(200).json({
    message: "تم حذف المستخدم بنجاح",
  });
});

// @desc update user by id
// @route put /api/user/id
// @access Private
const updateUserById = asuncHandler(async (req, res) => {
  const id = req.params.id;
  const { email, password, isAdmin, isActive } = req.body;
  // check if user try to update isAdmin or isActive
  if (!req.user.isAdmin) {
    if (isAdmin || isActive) {
      res.status(401);
      throw new Error("ليس لديك الصلاحيات الكافية");
    }
  }
  // check if id is valid
  if (!id) {
    res.status(400);
    throw new Error("الرجاء ادخال المعرف");
  }
  // check if user have axcess to update user
  if (req.user.id !== id && !req.user.isAdmin) {
    res.status(401);
    throw new Error("ليس لديك الصلاحيات الكافية");
  }
  // check if user want to update email
  if (email) {
    //  check if email is valid
    if (!validEmail(email)) {
      res.status(400);
      throw new Error("الرجاء ادخال بريد إلكتروني صالح");
    }
    // check if email exist
    const user = await User.findOne({ email });
    if (user) {
      res.status(400);
      throw new Error("البريد الالكتروني موجود");
    }
    // check if user want to update password
    if (password) {
      // check if password is valid
      if (password.length < 6) {
        res.status(400);
        throw new Error("الرجاء ادخال كلمة مرور قوية");
      }
      // hash password
      const hashedPassword = await hashData(password);
      // update user
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          email,
          password: hashedPassword,
          $set: req.body,
          isActive: false,
        },
        { new: true }
      );
      if (!updatedUser) {
        res.status(500);
        throw new Error("حدث خطأ أثناء تحديث البيانات");
      }
      // send email to user for email verification
      await emailVerificationOtp(updatedUser, res);
    }
    // update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        email,
        $set: req.body,
        isActive: false,
      },
      { new: true }
    );
    if (!updatedUser) {
      res.status(500);
      throw new Error("حدث خطأ أثناء تحديث البيانات");
    }
    // send email to user for email verification
    await emailVerificationOtp(updatedUser, res);
  }
  // check if user want to update password
  if (password) {
    // check if password is valid
    if (password.length < 6) {
      res.status(400);
      throw new Error("الرجاء ادخال كلمة مرور قوية");
    }
    // hash password
    const hashedPassword = await hashData(password);
    // update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
        password: hashedPassword,
      },
      { new: true }
    );
    if (!updatedUser) {
      res.status(500);
      throw new Error("حدث خطأ أثناء تحديث البيانات");
    }
    // generate access token
    const accessToken = generateAccessToken(updatedUser);
    // generate refresh token
    const refreshToken = generateRefreshToken(updatedUser);
    // send refresh token to db
    const newRefreshToken = await RefreshToken.create({
      userId: updatedUser._id,
      token: refreshToken,
    });
    if (!newRefreshToken) {
      res.status(500);
      throw new Error("حدث خطأ أثناء تحديث البيانات");
    }
    // send the response
    res.status(200).json({
      message: "تم تحديث البيانات بنجاح",
      accessToken,
      refreshToken,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        city: updatedUser.city,
        address: updatedUser.address,
        phoneNumber: updatedUser.phoneNumber,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        isActive: updatedUser.isActive,
      },
    });
  }

  // update user
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true }
  );
  if (!updatedUser) {
    res.status(500);
    throw new Error("حدث خطأ أثناء تحديث البيانات");
  }
  // generate access token
  const accessToken = generateAccessToken(updatedUser);
  // generate refresh token
  const refreshToken = generateRefreshToken(updatedUser);
  // send refresh token to db
  const newRefreshToken = await RefreshToken.create({
    userId: updatedUser._id,
    token: refreshToken,
  });
  if (!newRefreshToken) {
    res.status(500);
    throw new Error("حدث خطأ أثناء تحديث البيانات");
  }
  // send the response

  res.status(200).json({
    message: "تم تحديث البيانات بنجاح",
    accessToken,
    refreshToken,
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      city: updatedUser.city,
      address: updatedUser.address,
      phoneNumber: updatedUser.phoneNumber,
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin,
      isActive: updatedUser.isActive,
    },
  });
});
module.exports = { getUserById, getAllUsers, deleteUserById, updateUserById };
