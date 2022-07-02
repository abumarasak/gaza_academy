const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
// Nodemailer Stuff
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NOREPLY_EMAIL,
    pass: process.env.NOREPLY_PASSWORD,
  },
});
const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "../email_templates"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "../email_templates"),
  extName: ".handlebars",
};
transporter.use("compile", hbs(handlebarOptions));
// Testing success
transporter.verify((error, success) => {
  if (error) {
    console.log("Something went wrong with the email server!".bgRed.white);
  } else {
    console.log("Ready To send Emails".bgWhite.black);
  }
});
const sendEmail = async (emailOption) => {
  try {
    const emailSent = await transporter.sendMail(emailOption);
    return emailSent;
  } catch (error) {
    throw error;
    console.log(error);
  }
};
module.exports = sendEmail;
