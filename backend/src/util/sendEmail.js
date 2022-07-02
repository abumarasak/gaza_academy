const nodeMailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
// nodemailer Stuff
const transporter = nodeMailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NOREPLY_EMAIL,
    pass: process.env.NOREPLY_PASSWORD,
  },
});
// Handlebars Stuff
const handlebarsOptions = {
  viewEngine: {
    extName: ".handelbars",
    partialsDir: "../views/emails",
    defaultLayout: false,
  },
  viewPath: path.resolve("../views/emails"),
  extName: ".handelbars",
};
transporter.use("compile", hbs(handlebarsOptions));
// testing successsful email sending
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages".bgRed);
  }
});
module.exports = transporter;
