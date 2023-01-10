const jwt = require("./jwt");

const createUserToToken = (user) => {
  return { name: user.name, id: user._id, role: user.role };
};

module.exports = createUserToToken;
