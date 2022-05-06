const mongoose=require("mongoose")
const InternModel=require("../Models/InternModel")
const CollegeModel = require("../Models/CollegeModel");


//VALIDATION OF EMAIL BY REJEX
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

//VALIDATION OF STRING BY REJEX
const validatefield = (Feild) => {
    return String(Feild).match(/^[a-zA-Z]/);
  };


//VALIDATION OF MOBILE NO BY REJEX
const validateNumber = (Feild) => {
    return String(Feild).match(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
  };

//............................................Create Intern (Post API)................................................


const createInternData=async function(req,res){
    try{
    const data=req.body
    const obj = {};
        const name = data.name;
        const email = data.email;
        const mobile = data.mobile;
        const isDeleted = data.isDeleted;



    if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, message: "Intern details not given" });
    }

    if (!data.name) {
        return res.status(400).send({ status: false, message: "Name not given" });
      }
    if (!validatefield(data.name)) {
          return res.status(400).send({ status: false, message: "Invaild! Name Format" }); //Name validation By Rejex
    }
    obj.name = name;

    if (!data.collegeName) {
        return res.status(400).send({ status: false, message: "College Name Not given" });
      }
    if (!validatefield(data.collegeName)) {
        return res.status(400).send({ status: false, message: "Invaild! College Name Format" }); //Name validation By Rejex
  }

      const id= await CollegeModel.findOne({name:data.collegeName}).select({_id:1});

    if (!id) {
        return res.status(400).send({ status: false, message:"No College Exist with This name"});
      }
      obj.collegeId = id._id;

    if (!data.email){
            return res.status(400).send({status:false,message:"Email is missing"});
    }


    if (!validateEmail(data.email)) {
          return res.status(400).send({status: false, message: "Invaild E-mail id." });//email validation by Rejex
    }
    obj.email = email;

    if (!data.mobile){
        return res.status(400).send({status:false,message:"Mobile Number is missing"});
    }

    if (!validateNumber(data.mobile)) {
        return res.status(400).send({status: false, message: "Invaild Mobile No.." });
  }
  obj.mobile = mobile;

  const match = await InternModel.findOne({ email: data.email }); //email exist or not

  if(match){
    return res.status(404).send({ status:false,message:  `Email Id >> ${data.email} Already Registered.Please,Give Another ID`})
}
  const mobileno = await InternModel.findOne({ mobile: data.mobile});

  if(mobileno){
    return res.status(404).send({ status:false,message: `Mobile no. >>${data.mobile} Already Registered.Please,Give Another Mobile.no`})
}
if (isDeleted){
    if(typeof(isDeleted)!="boolean"){
        return res.status(400).send({status: false, message: "Invalid Input of isDeleted.It must be true or false "});

    }
    obj.isDeleted = isDeleted;
}

    const result=await InternModel.create(obj)
        return res.status(201).send({ status:true,data: result })
        }
    catch (err){
  res.status(500).send({ status: false, message: err.message });
}};


//............................................Create GetIntern (GetAPI)................................................



const getinterndata = async function (req, res) {  //get blog using filter query params
    try{


        const name = req.query.collegeName;

        if (!name){
            return res.status(400).send({status:false,message:"Please Provide College Name"});
        }
        const find = await CollegeModel.findOne({name:name,isDeleted:false}).select({_id:1});
        const data =await CollegeModel.findById(find).select({_id:0,name:1,fullName:1,logoLink:1});
        if (!data) {
            return res.status(404).send({ status: false, message: "No College Exists with This Name" });
        }
        const match=await InternModel.find({collegeId:find._id,isDeleted:false}).select({_id:1,name:1,email:1,mobile:1});
        if (match.length == 0) {
            return res.status(404).send({ status: false, message: "No Interns Found For This College" });
        }
        const collegedetails=JSON.parse(JSON.stringify(data))
        collegedetails.intrests=match

       res.status(200).send({status:true,data: collegedetails})
  }
    catch (err){
  res.status(500).send({ status: false, message: err.message });
}};

module.exports.createInternData=createInternData
module.exports.getinterndata=getinterndata