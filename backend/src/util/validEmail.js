const validEmail = (email) => {
  const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  return valid;
};
module.exports = validEmail;
