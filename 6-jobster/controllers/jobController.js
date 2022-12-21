const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const index = async (req, res) => {
  const { search, status, jobType, sort, page } = req.query;
  const user_id = req.auth._id;

  console.log({ status, jobType, sort, page });

  const query = { user_id };
  let sortyBy = "-createdAt";

  if (search) query.position = { $regex: search, $options: "i" };
  if (status && status !== "all") query.status = status;
  if (jobType && jobType !== "all") query.jobType = jobType;

  if (sort) {
    if (sort === "latest") sortyBy = "-createdAt";
    if (sort === "oldest") sortyBy = "createdAt";
    if (sort === "a-z") sortyBy = "position";
    if (sort === "z-a") sortyBy = "-position";
  }

  const limit = +req.query.limit || 10;
  const skip = (req.query.page - 1) * limit;

  const jobs = await Job.find(query).limit(limit).skip(skip).sort(sortyBy);

  const totalJobs = await Job.countDocuments(query);
  const numOfPages = totalJobs / limit;

  return res.status(StatusCodes.OK).send({ jobs, totalJobs, numOfPages });
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
