const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  UnauthenticatedError,
  BadRequestError,
} = require("../errors");

const index = async (req, res) => {
  const { search, status, jobType, sort, page } = req.query;
  const user_id = req.auth._id;

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

  if (req.isTest()) {
    throw new BadRequestError(
      "Test user only allowd to perform read operations"
    );
  }

  return res.status(StatusCodes.CREATED).send(job);
};

const update = async (req, res) => {
  const id = req.params.id;
  const user_id = req.auth._id;
  const { company, position, status } = req.body;

  if (req.isTest()) {
    throw new BadRequestError(
      "Test user only allowd to perform read operations"
    );
  }

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

const showStats = async (req, res) => {
  const user_id = req.auth._id;

  const pipleLine = [
    { $match: { user_id } },
    {
      $facet: {
        defaultStats: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ],
        monthlyApplications: [
          {
            $group: {
              _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.year": -1, "_id.month": -1 } },
          {
            $limit: 10,
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
        ],
      },
    },
  ];

  const [result] = await Job.aggregate(pipleLine);

  result.defaultStats = result.defaultStats.reduce((acc, cur) => {
    acc[cur._id] = cur.count;
    return acc;
  }, {});

  result.monthlyApplications = result.monthlyApplications.map((item) => {
    const { year, month } = item._id;
    const date = `${month} of ${year}`;
    const count = item.count;

    return { date, count };
  });

  res.status(StatusCodes.OK).json(result);
};

module.exports = { index, show, store, update, destroy, showStats };
