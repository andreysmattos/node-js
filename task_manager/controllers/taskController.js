const get = (req, res) => {
  res.status(200).json([1, 2, 3]);
};

const store = (req, res) => {
  res.status(201).json([1, 2, 3]);
};

module.exports = {
  get,
  store,
};
