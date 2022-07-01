const generateOTP = () => {
  const OTP = Math.floor(100000 + Math.random() * 900000);
  return OTP;
};
module.exports = generateOTP;
