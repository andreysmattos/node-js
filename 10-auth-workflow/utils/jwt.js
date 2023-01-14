const jwt = require("jsonwebtoken");
const ONE_DAY_IN_TIMESTAMPS = 1000 * 60 * 60 * 24;

const create = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachSingleCookieToResponse = (res, payload) => {
  const token = create(payload);

  res.cookie("token", token, {
    expires: new Date(Date.now() + ONE_DAY_IN_TIMESTAMPS),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  return token;
};

const attachCookiesToResponse = (res, payload, refreshToken) => {
  const acessTokenJWT = create(payload);
  const refreshTokenJWT = create({ user: payload, refreshToken });

  res.cookie("acessToken", acessTokenJWT, {
    // expires: new Date(Date.now() + ONE_DAY_IN_TIMESTAMPS),

    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    maxAge: 1000 * 60 * 15,
    // maxAge: 1000,
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    expires: new Date(Date.now() + ONE_DAY_IN_TIMESTAMPS),

    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  return acessTokenJWT;
};

const removeCookiesToResponse = (res) => {};
module.exports = {
  create,
  verify,
  attachCookiesToResponse,
  removeCookiesToResponse,
};
