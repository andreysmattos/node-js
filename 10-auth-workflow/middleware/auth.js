const { Unanthenticated, Forbidden } = require("../Exceptions");
const User = require("../Models/User");
const Token = require("../Models/Token");
const jwt = require("../utils/jwt");

// const auth = async (req, res, next) => {
//   const { token } = req.signedCookies;
//   if (!token) throw new Unanthenticated("Provide token");

//   try {
//     const payload = jwt.verify(token);
//     const user = await User.findOne({ _id: payload.id }, { password: 0 });
//     if (!user) throw new Unanthenticated("User is not valid");

//     req.user = user;
//     next();
//   } catch (error) {
//     throw new Unanthenticated("Provide a valid token");
//   }
// };

const auth = async (req, res, next) => {
  const { acessToken, refreshToken } = req.signedCookies;

  try {
    if (acessToken) {
      const payload = jwt.verify(acessToken);
      const user = await User.findOne({ _id: payload.id }, { password: 0 });
      if (!user) throw new Unanthenticated("User is not valid");

      req.user = user;
      return next();
    }

    const payload = jwt.verify(refreshToken);

    const existingToken = await Token.findOne({
      user_id: payload.user.id,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new Unanthenticated("User is not valid");
    }

    const user = await User.findOne(
      { _id: existingToken.user_id },
      { password: 0 }
    );
    if (!user) throw new Unanthenticated("User is not valid");

    req.user = user;
    jwt.attachCookiesToResponse(res, payload, refreshToken);

    return next();

    console.log({ existingToken });
  } catch (error) {
    console.log({ error });
    throw new Unanthenticated("Provide a valid token");
  }
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Forbidden("Unauthorized to access this route.");
    }
    return next();
  };
};

module.exports = { auth, hasRole };
