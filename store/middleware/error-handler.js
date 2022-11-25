module.exports = async (err, req, res, next) => {
  console.log(err);
  return res.status(err.statusCode || 500).json({msg: err.message});
};
