let { people } = require("../data");

const get = (req, res) => {
  return res.json(people);
};

const store = (req, res) => {
  const id =
    people.reduce((prev, current) => (prev > current ? prev : current)).id + 1;
  const { name: _name } = req.body;

  people.push({ id, name: _name });
  return res.status(201).json(people);
};

const update = (req, res) => {
  const id = req.params.id;
  const new_name = req.body.name;

  const person = people.find((item) => item.id == id);

  if (new_name) {
    person.name = req.body.name;
  }

  return res.status(201).json(people);
};

const destroy = (req, res) => {
  const id = req.params.id;
  people = people.filter((item) => item.id !== Number(id));

  return res.status(201).json(people);
};

module.exports = {
  get,
  store,
  update,
  destroy,
};
