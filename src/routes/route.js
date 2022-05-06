const express = require('express');
const router = express.Router();
const collegeController=require("../controllers/collegeController")
const internController=require("../controllers/internControllers")


router.get("/test-me",function(req,res){
    console.log("Gaurav poly")
})

router.post("/functionup/colleges",collegeController.createCollegeData)
router.post("/functionup/interns",internController.createInternData)
router.get("/functionup/collegeDetails",internController.getinterndata)

module.exports = router;