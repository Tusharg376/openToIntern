const collegeModel= require('../models/collegeModel')
const internModel=require('../models/internModel')
const isValidObjectId=require('mongoose')



const createCollege = async function(req,res){
    try {
	let data =  req.body
	    let {name,fullName,logoLink} = data
	    if(!name) return res.status(400).send({status:false,message:"Please provide name"})
	    if(!fullName) return res.status(400).send({status:false,message:"Please provide fullName"})
	    if(!logoLink) return res.status(400).send({status:false,message:"Please provide logoLink"})
	    let checkName = await collegeModel.find({$and:[{name:name, isDeleted:false}]})
	    if(checkName) return res.status(400).send({status:false,message:"Unique name is required"})
	    let finalData = await collegeModel.create(data)
	    res.status(201).send({status:true,data:finalData})
} catch (error) {
    res.status(500).send({status:false,message:error.message})
}

}

const createIntern=async function(req,res){
    const data=req.body
    if(!data) return res.status(400).send({status:false,msg:"to create Intern body data is required"})
    if(!data.name) return res.status(400).send({status:false,msg:"name is mandatory"})
    if(!data.email) return res.status(400).send({status:false,msg:"email is mandatory"})
    if(!data.email.match(/.+\@.+\..+/)) res.status(400).send({status:false,msg:"invalid email"})
    if(!data.mobile) return res.status(400).send({status:false,msg:"mobil is mandatory"})
    if(!data.mobile.match(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)) res.status(400).send({status:false,msg:"invailid mobile number"})
    if(!data.collegeId) return res.status(400).send({status:false,msg:"college name/Id is required"})
    if(!isValidObjectId(data.collegeId)) res.status(400).send({status:false,msg:"Object id Invalid with that you want to create intern"})
    const college= await collegeModel.findOne({_id:data.collegeId, isDeleted:false })
    if(!college) return res.status(404).send({status:false,msg:"college not found"})
    
    const saveData= await internModel.create(data)
    return res.status(201).send({status:true,data:saveData})
}

const collegeDetails= async function(req,res){

}









module.exports.createCollege=createCollege
module.exports.createIntern=createIntern
module.exports.collegeDetails=collegeDetails