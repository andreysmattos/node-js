module.exports = (req, res, next) => {
  const { user } = req.query;

  if (user === "andreysmattos") {
    req.user = { name: user, id: 3 };
    return next();
  } else {
    return res.status(401).send("Unathorized");
  }
};
