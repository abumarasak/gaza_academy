const bcrypt = require("bcryptjs");
const verifyHashedData = async (unhashed, hashed) => {
  try {
    const match = await bcrypt.compare(unhashed, hashed);
    return match;
  } catch (error) {
    console.log(error);
  }
};
const hashData = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data, salt);
  return hash;
};
module.exports = { verifyHashedData, hashData };
