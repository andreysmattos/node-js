module.exports = (err, req, res, next) => {
  console.log('err', err)
  return res.status(500).json(err);
};
