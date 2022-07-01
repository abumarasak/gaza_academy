const mongooose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongooose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected succcessfully".green.inverse);
  } catch (err) {
    console.log(`${err}`.red);
    process.exit(1);
  }
};
module.exports = connectDB;
