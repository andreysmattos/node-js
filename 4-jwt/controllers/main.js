const customError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new customError('Please provide username and password.', 400)
  }

  console.log("username", username);
  console.log("password", password);

  return res.json("Fake login/Register/Singup Route");
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello. Andrey`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { dashboard, login };
