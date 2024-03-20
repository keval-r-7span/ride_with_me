const nodemailer = require("nodemailer");
const{MAIL} = require("../helper/constants")

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: MAIL.HOST,
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: MAIL.USER,
    pass: MAIL.PASS,
  },
});

module.exports = transporter