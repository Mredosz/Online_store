const nodemailer = require("nodemailer");
require("dotenv").config();

const ports = [25, 465, 587, 2525];

const sendEmail = async (to) => {
  for (const port of ports) {
    try {
      const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port,
        auth: {
          user: process.env.MailTrapUser,
          pass: process.env.MailTrapPass,
        },
      });

      const info = await transporter.sendMail({
        from: '"Capy store" <capy@store.com>',
        to,
        subject: "Order confirmed",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
      });

      console.log("Email send: %s", info.messageId);
      return;
    } catch (e) {
      console.error("Email send failure: ", e);
    }
  }
  console.error("Email doesn't send.");
};

module.exports = sendEmail;
