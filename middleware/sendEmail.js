const nodemailer = require("nodemailer");
require("dotenv").config();
const {
  resetPasswordTemplate,
  confirmEmailTemplate,
} = require("./emailTemplates");

const sendPasswordResetEmail = (recipientEmail, recipientName, resetLink) => {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS,
      },
    });
    const mail_configs = {
      from: process.env.SENDER_EMAIL,
      to: recipientEmail,
      subject: "Skill Learn Password Reset",
      html: resetPasswordTemplate(recipientName, resetLink),
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        return reject({ message: error.message });
      }
      return resolve({ message: "Success" });
    });
  });
};

const sendEmailConfirmEmail = (recipientEmail, recipientName, confirmLink) => {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS,
      },
    });
    const mail_configs = {
      from: process.env.SENDER_EMAIL,
      to: recipientEmail,
      subject: "Skill Learn account email confirmation",
      html: confirmEmailTemplate(recipientName, confirmLink),
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        return reject({ message: error.message });
      }
      return resolve({ message: "Success" });
    });
  });
};

module.exports = { sendPasswordResetEmail, sendEmailConfirmEmail };
