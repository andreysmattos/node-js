const jwt = require("jsonwebtoken");
const ONE_DAY_IN_TIMESTAMPS = 1000 * 60 * 60 * 24;

const create = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = (res, payload) => {
  const token = create(payload);

  res.cookie("token", token, {
    expires: new Date(Date.now() + ONE_DAY_IN_TIMESTAMPS),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  return token;
};

const removeCookiesToResponse = (res) => {};
module.exports = {
  create,
  verify,
  attachCookiesToResponse,
  removeCookiesToResponse,
};
