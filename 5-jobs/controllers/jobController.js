const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const index = async (req, res) => {
  console.log(req.headers.authorizationf);
  const user_id = req.auth._id;

  return res
    .status(StatusCodes.OK)
    .send(await Job.find({ user_id }).sort("createdAt"));
};

const show = async (req, res) => {
  const user_id = req.auth._id;
  const id = req.params.id;

  const job = await Job.findOne({ _id: id, user_id });

  if (!job) throw new NotFoundError();

  return res.send(job);
};

const store = async (req, res) => {
  const { company, position, status } = req.body;
  const user_id = req.auth.id;
  const job = await Job.create({ company, position, status, user_id });

  return res.status(StatusCodes.CREATED).send(job);
};

const update = async (req, res) => {
  const id = req.params.id;
  const user_id = req.auth._id;
  const { company, position, status } = req.body;

  const job = await Job.updateOne(
    { _id: id, user_id },
    { company, position, status },
    {
      runValidators: true,
    }
  );

  if (!job) throw new NotFoundError();

  return res.status(StatusCodes.ACCEPTED).send(job);
};

const destroy = async (req, res) => {
  const user_id = req.auth._id;
  const id = req.params.id;
  return res
    .status(StatusCodes.ACCEPTED)
    .send(await Job.deleteOne({ _id: id, user_id }));
};

module.exports = { index, show, store, update, destroy };
