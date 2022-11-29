const express = require("express");
const {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobDetails,
} = require("../controller/jobController");

const router = express.Router();

router.route("/job").get(getAllJobs);
router.route("/job/new").post(createJob);
router.route("/job/:id").put(updateJob).delete(deleteJob).get(getJobDetails);

module.exports = router;
