const index = async (req, res) => {
  throw new Error('kié');
  res.status(200).json({ msg: "Products routes" });
};

const indexStatic = async (req, res) => {
  res.status(200).json({ msg: "Products testing routes" });
};

module.exports = {
  index,
  indexStatic,
};
