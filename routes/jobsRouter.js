const express=require("express")
const router=express.Router()
const {createJob,deleteJob,getAllJobs,updateJob,showStats}=require("../controllers/jobsController.js")
router.route('/').get(getAllJobs)
router.route('/addJob').post(createJob)
router.route("/stats").get(showStats)
router.route("/:id").delete(deleteJob).patch(updateJob)

module.exports=router;