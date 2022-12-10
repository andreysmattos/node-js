const index = async (req, res) => {
  return res.send("index");
};

const show = async (req, res) => {
  return res.send("show");
};

const store = async (req, res) => {
  return res.send("store");
};

const update = async (req, res) => {
  return res.send("update");
};

const destroy = async (req, res) => {
  return res.send("destroy");
};

module.exports = { index, show, store, update, destroy };
