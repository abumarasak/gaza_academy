const sendEmail = require("../../util/sendEmail");
const UserVerification = require("../../domains/email_verification/model");
const generateOTP = require("../../util/generateOTP");
const asuncHandler = require("express-async-handler");
const hashData = require("../../util/hashData");
const sendVerificationEmail = asuncHandler(
  async ({ _id, email, name }, res) => {
    const otp = generateOTP();
    // hash otp
    const hashOtp = await hashData(`${otp}`);
    if (!hashOtp) {
      res.status(401);
      throw new Error("حدث خطأ أثناء إرسال الكود");
    }
    const newVerification = UserVerification.create({
      userId: _id,
      otp: hashOtp,
    });
    if (!newVerification) {
      res.status(401);
      throw new Error("حدث خطأ ما");
    }
    const mailOptions = {
      from: process.env.NOREPLY_EMAIL,
      to: email,
      subject: "تأكيد حسابك",
      template: "verification",
      context: {
        name,
        otp,
      },
    };
    const sentEmail = await sendEmail(mailOptions);
    if (!sentEmail) {
      res.status(401);
      throw new Error("حدث خطأ ما");
    }
    res.status(200).json({ message: "تم ارسال رمز التاكيد بنجاح" });
  }
);
module.exports = sendVerificationEmail;
