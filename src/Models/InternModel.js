const mongoose = require("mongoose");
const objectId=mongoose.Schema.Types.ObjectId
const CollegeModel = require("./CollegeModel");
const internModel = new mongoose.Schema(
  {
    name: {
      type:String,
      required: true,
      trim: true,
    },
    email: {
      type:String,
      required: true,
      unique: true,
      trime:true
    },
    mobile: {
      type:Number,
      required: true,
      unique: true,
    },
    collegeId: {
      type: objectId,
      ref: "CollegeModel",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("internModel", internModel);
