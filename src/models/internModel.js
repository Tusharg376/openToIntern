const mongoose = require('mongoose')
const objectId =mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  mobile:{
    type:Number,
    unique:true,
    required:true
  },
  collegeId:{
    type:objectId,
    ref: 'college',
    required:true
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
},{timestamps:true})

module.exports = mongoose.model('internData', internSchema)