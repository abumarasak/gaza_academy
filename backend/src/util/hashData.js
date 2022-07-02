const bcrypt = require("bcryptjs");
const hashData = (unhashed) => {
  try {
    const salt = bcrypt.genSalt(10);
    const hashed = bcrypt.hash(unhashed, salt);
    return hashed;
  } catch (err) {
    console.log(err);
  }
};
module.exports = hashData;
