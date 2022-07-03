const User = require("../user/model");
const EmailVerification = require("./model");
const asuncHandler = require("express-async-handler");
const { verifyHashedData, hashData } = require("../../util/bcrypt");
const sendEmail = require("../../util/sendEmail");
const generateOTP = require("../../util/generateOTP");
// @desc email verification
// @route Posr /api/email_verification
// @access Public
const emailVerification = asuncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    res.status(401);
    throw new Error("يجب إدخال جميع الحقول");
  }
  const email_verification = await EmailVerification.findOne({ email });
  if (!email_verification) {
    res.status(401);
    throw new Error("هذا البريد الإلكتروني غير مسجل");
  }
  const isValidOtp = await verifyHashedData(
    `abc${otp}def`,
    email_verification.otp
  );
  if (!isValidOtp) {
    // check if attempts is less than 3
    if (email_verification.attempts < 3) {
      // increment attempts
      email_verification.attempts += 1;
      await email_verification.save();
      res.status(401);
      throw new Error("رمز التأكيد غير صحيح");
    } else {
      // delete email_verification
      const deletedEmailVerification = await EmailVerification.deleteOne({
        _id: email_verification._id,
      });
      if (!deletedEmailVerification) {
        res.status(401);
        throw new Error("حدث خطأ ما");
      }
      // generate new otp
      const newOtp = generateOTP();
      // hash otp
      const hashOtp = await hashData(`abc${newOtp}def`);
      // send new email verification
      const newEmailVerification = await EmailVerification.create({
        userId: email_verification.userId,
        email,
        otp: hashOtp,
        attempts: 0,
      });

      if (!newEmailVerification) {
        res.status(401);
        throw new Error("حدث خطأ ما");
      }
      const user = await User.findOne({ _id: email_verification.userId });
      if (!user) {
        res.status(401);
        throw new Error("حدث خطأ ما");
      }

      // send email
      const mailOptions = {
        from: process.env.NOREPLY_EMAIL,
        to: email,
        subject: "تأكيد حسابك",
        template: "verification",
        context: {
          name: user.name,
          otp: newOtp,
        },
      };
      const sentEmail = await sendEmail(mailOptions);
      if (!sentEmail) {
        res.status(401);
        throw new Error("حدث خطأ ما");
      }
      res
        .status(401)
        .json({ message: "الرمز خطأ تم ارسال رمز جديد الى البريد الألكتروني" });
    }
  }
  // update user to active
  const updatedUser = await User.findOneAndUpdate(
    { _id: email_verification.userId },
    { isActive: true }
  );
  if (!updatedUser) {
    res.status(401);
    throw new Error("حدث خطأ ما");
  }
  // delete email_verification
  const deletedEmailVerification = await EmailVerification.deleteOne({
    _id: email_verification._id,
  });
  if (!deletedEmailVerification) {
    res.status(401);
    throw new Error("حدث خطأ ما");
  }
  res.status(200).json({ message: "تم تأكيد البريد الألكتروني بنجاح" });
});
module.exports = { emailVerification };
