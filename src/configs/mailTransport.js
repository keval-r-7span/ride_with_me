const nodemailer = require("nodemailer");
const{MAIL} = require("../helper/constants")


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "kevaltest27@gmail.com",
    pass: MAIL.PASS,
  },
});

module.exports = transporter