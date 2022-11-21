const index = (req, res) => {
  res.status(200).json([1, 2, 3]);
};

const store = (req, res) => {
  res.status(201).json(req.body);
};

const show = (req, res) => {
  res.status(200).json(req.params);
};

const update = (req, res) => {
  res.status(200).json([req.params, req.body]);
};

const destroy = (req, res) => {
  res.status(200).json(req.params);
};

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
