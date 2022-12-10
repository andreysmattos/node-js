const register = async (req, res) => {
  return res.send("register user");
};

const login = async (req, res) => {
  return res.send("login user");
};

module.exports = { login, register };
