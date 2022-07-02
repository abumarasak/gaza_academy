const transporter = require("../../util/sendEmail");
const UserVerification = require("../../domains/email_verification/model");
const generateOTP = require("../../util/generateOTP");
const User = require("../../domains/user/model");
const asuncHandler = require("express-async-handler");
const hashData = require("../../util/hashData");

const sendVerificationEmail = asuncHandler(async ({ _id, email }, res) => {
  const otp = generateOTP();
  const hashedOTP = await hashData(otp);
  const userVerification = await UserVerification.create({
    userId: _id,
    otp: hashedOTP,
    route: 0,
  });
  if (!userVerification) {
    res.status(500);
    throw new Error("حدث خطأ ما");
  }
  const user = await User.findById(_id);
  const mailOptions = {
    from: process.env.NOREPLY_EMAIL,
    to: email,
    subject: "تأكيد البريد الإلكتروني",
    template: "verification",
    context: {
      otp,
      email,
      name: user.name,
    },
  };
  const emailSended = await transporter.sendMail(mailOptions);
  if (!emailSended) {
    res.status(500);
    throw new Error("حدث خطأ ما");
  }
  res.status(200).json({
    message: "تم إرسال رمز التأكيد بنجاح",
  });
});
module.exports = sendVerificationEmail;
