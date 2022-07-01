const bcrypt = require("bcryptjs");
const verifyHashedData = async (unhashed, hashed) => {
  try {
    const match = await bcrypt.compare(unhashed, hashed);
    return match;
  } catch (error) {
    console.log(error);
  }
};
module.exports = verifyHashedData;
