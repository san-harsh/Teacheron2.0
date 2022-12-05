const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/errorHandler");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create Job

exports.createJob = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const job = await Job.create(req.body);
  res.status(201).json({
    success: true,
    job,
  });
});

//Get all jobs

exports.getAllJobs = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 10;
  const jobCount = await Job.countDocuments();
  const apiFeatures = new ApiFeatures(Job.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const job = await apiFeatures.query;

  res.status(200).json({ success: true, job });
});

// Update Job --Admin

exports.updateJob = async (req, res, next) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    // return res.status(500).json({
    //   success: false,
    //   message: "Job not found",
    // });
    return next(new ErrorHandler("job not found", 404));
  }
  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    job,
  });
};

//delete the job

exports.deleteJob = async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    // return res.status(500).json({
    //   success: false,
    //   message: "Job not found",
    // });
    return next(new ErrorHandler("job not found", 404));
  }

  await job.remove();
  res.status(200).json({
    success: true,
    message: "job deleted",
  });
};

//get the job details

exports.getJobDetails = async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    // return res.status(500).json({
    //   success: false,
    //   message: "Job not found",
    // });

    return next(new ErrorHandler("job not found", 404));
  }
  res.status(200).json({
    success: true,
    job,
    jobCount,
  });
};
