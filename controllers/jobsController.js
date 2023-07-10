const Job=require('../models/Job.js');
const express=require('express')
const {mongoose}=require('mongoose')
const { checkPermission } = require('../utils/checkPermission.js');
const createJob = async (req, res) => {
    const { position, company } = req.body;
    if (!position || !company) {
      throw new Error("Please Provide All Values");
    }
    try {
        req.body.createdBy = req.user.userId;
        const job = await Job.create(req.body);
        res.status(201).json({job});        
    } catch (error) {
      console.log(error)
        res.status(500).json({error:error.message})
    }
  };  
  const deleteJob = async (req, res) => {
    const { id: jobId } = req.params;
  
    const job = await Job.findOne({ _id: jobId });
  
    if (!job) {
      throw new NotFoundError(`No job with id : ${jobId}`);
    }
    checkPermission(req.user, job.createdBy);
    await job.deleteOne();
    res.status(200).json({ msg: 'Success! Job removed' });
  };
  // const getAllJobs = async (req, res) => {
  //   const jobs = await Job.find({ createdBy: req.user.userId });
  
  //   res
  //     .status(200)
  //     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
  // };


const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status !== 'all') {
    queryObject.status = status;
  }
  if (jobType !== 'all') {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  // NO AWAIT
  let result = Job.find(queryObject);

  // chain sort conditions
  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }
  const jobs = await result;

  res
    .status(200)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position, status } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Please provide all values');
  }
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`);
  }
  checkPermission(req.user, job.createdBy);
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ updatedJob });
};
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy:  new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  
  if (stats === undefined || stats === null) {
    stats = []; // Set stats to an empty array if it's undefined or null
  }
  
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log(stats);

  const defaultStats = {
    pending: stats.Pending || 0,
    interview: stats.Interview || 0,
    declined: stats.Declined || 0,
  };
  let monthlyApplications = [];
  res.status(200).json({ defaultStats, monthlyApplications });
};


module.exports={createJob,deleteJob,getAllJobs,updateJob,showStats};
