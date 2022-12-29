const nodemailer = require("nodemailer");

const index = async (req, res) => {
  return res.send(`<h1>E-mail Project</h1> <a href="/send"> Send E-mail</a>`);
};

const send = async (req, res) => {
  const testeAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "reilly.hudson35@ethereal.email",
      pass: "kkNwWcgdv5ZKDdjSy2",
    },
  });

  const info = await transporter.sendMail({
    from: '"Andrey Mattos" <andreysmattos@hotmail.com>',
    to: "andreysmattos@hotmail.com",
    subject: "Hello",
    html: "<h2> Sending Emails with NodeJS</h2>",
  });

  return res.json(info);
};

module.exports = { index, send };
