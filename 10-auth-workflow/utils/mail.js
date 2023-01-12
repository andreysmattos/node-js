const nodemailer = require("nodemailer");

const send = async () => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "fay.zieme0@ethereal.email",
      pass: "Cukr7A3K3Anv78edDz",
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <andreysmattos@hotmail.com>', // sender address
    to: "user@user.com, baz@user.com", // list of receivers
    subject: "KOE MEO KERIDO", // Subject line
    text: "E AI?", // plain text body
    html: "<b>OIIE?</b>", // html body
  });
};

module.exports = { send };
