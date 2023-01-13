const nodemailer = require("nodemailer");

const send = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(require("../config/mail"));

  const info = await transporter.sendMail({
    from: '"Andrey Mattos" <andreysmattos@hotmail.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = { send };
