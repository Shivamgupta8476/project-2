const { links } = require("express/lib/response");
const mongoose = require("mongoose");
const interndata=require("./InternModel")
const collegeModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      toLowerCase: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      toLowerCase: true,
    },

    logoLink: {
      type:String,
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("CollegeModel", collegeModel);
