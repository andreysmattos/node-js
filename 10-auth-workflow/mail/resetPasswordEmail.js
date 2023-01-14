const mail = require("../utils/mail");

module.exports = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/front/reset-password?token=${token}`;

  const message = `
  <p>Click here to reset yout password: 
  <a href="${resetURL}">RESET PASSWORD</a></p>
  
  `;
  return mail.send({
    to: email,
    subject: "Reset password",
    html: `<h4>Hello, ${name}</h4>${message}`,
  });
};
