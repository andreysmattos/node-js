const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const index = async (req, res) => {
  /*
    status: interview
    jobType: remote
    sort: a-z
    page: 1
  */
  const { status, jobType, sort, page } = req.query;
  const user_id = req.auth._id;

  console.log({ status, jobType, sort, page });

  const query = { user_id };

  if (status && status !== "all") query.status = status;

  if (jobType && jobType !== "all") query.jobType = jobType;

  if (sort) {
  }

  const jobs = await Job.find(query).sort("createdAt");

  return res.status(StatusCodes.OK).send({ jobs });
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

  const job = await Job.findOneAndUpdate(
    { _id: id, user_id },
    { company, position, status },
    {
      runValidators: true,
    }
  );

  if (!job) throw new NotFoundError();

  return res.status(StatusCodes.ACCEPTED).send({ job });
};

const destroy = async (req, res) => {
  const user_id = req.auth._id;
  const id = req.params.id;
  return res
    .status(StatusCodes.ACCEPTED)
    .send(await Job.deleteOne({ _id: id, user_id }));
};

module.exports = { index, show, store, update, destroy };
