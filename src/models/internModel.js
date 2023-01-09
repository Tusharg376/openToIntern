const mongoose = require('mongoose')

const internSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true
  },
  mobile:{
    type:Number,
    unique:true,
  },
  collegeId:{
    type:objectId,
    ref: college
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
},{timestamps:true})

module.exports = mongoose.model('internData', internSchema)