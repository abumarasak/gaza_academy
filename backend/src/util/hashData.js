const bcrypt = require("bcryptjs");
const hashData = async (unhashed) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(unhashed, salt);
    return hashed;
  } catch (error) {
    console.log(error);
  }
};
