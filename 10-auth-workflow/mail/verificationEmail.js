const mail = require("../utils/mail");

module.exports = async ({ name, email, verificationToken, origin }) => {
  const verifyEmail = `${origin}/verify-email?token=${verificationToken}`;
  const message = `
  <p>Please confirm your email by click on the following link: 
  <a href="${verifyEmail}">verify</a></p>
  
  `;
  return mail.send({
    to: email,
    subject: "E-mail confirmation",
    html: `<h4>Hello, ${name}</h4>${message}`,
  });
};
