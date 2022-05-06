const mongoose = require("mongoose");
const CollegeModel = require("../Models/CollegeModel");

const createCollegeData = async function (req, res) {

    const validatefield = (Feild) => {
      return String(Feild)
      .match(/^[a-zA-Z]/);
    };

     const validatelogo= (logo) => {
        return String(logo)
        .match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/);
      };


//.......................................Create College (Post API)....................................................


const data = req.body;
    try {

    if (Object.keys(data).length == 0){
      return res.status(400).send({ status: false, message: "College details not given" });
    }

    if (!data.name) {
      return res.status(400).send({ status: false, message: "Name not given" });
    }
    if (!validatefield(data.name)) {
        return res.status(400).send({ status: false, message: "Invaild! Name Format" }); //Name validation By Rejex
      }

      if (!data.fullName) {
      return res.status(400).send({ status: false, message: "fullName not given" });
    }
    if (!validatefield(data.fullName)) {
        return res.status(400).send({ status: false, message: "Invaild! fullName Format" }); //fullName validation By Rejex
      }

      if (!data.logoLink) {
      return res.status(400).send({ status: false, message: "logoLink not given" });
    }

     if (!validatelogo(data.logoLink)) {
        return res.status(400).send({ status: false, message: "Invaild! logolink Format" }); //fullName validation By Rejex
      }

    const match = await CollegeModel.findOne({name: data.name})
      if (match){
         res.status(400).send({ status:false,message: `you have already created college with ${data.name} name` })
      }

    const result = await CollegeModel.create(data);
    return res.status(201).send({ status:true,message: result })
    }

  catch (err){
    res.status(500).send({ status: false, message: err.message });
}};


module.exports.createCollegeData = createCollegeData;
