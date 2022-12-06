const express = require("express");
const {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobDetails,
} = require("../controller/jobController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/job").get(getAllJobs);
router.route("/job/new").post(isAuthenticatedUser, createJob);
router
  .route("admin/job/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateJob)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteJob)
  .get(getJobDetails);

router.route("/job/:id").get(getJobDetails);

module.exports = router;
