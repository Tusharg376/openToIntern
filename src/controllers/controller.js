const collegeModel= require('../models/collegeModel')
const internModel=require('../models/internModel')




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

}

const collegeDetails= async function(req,res){
    
}









module.exports.createCollege=createCollege
module.exports.createIntern=createIntern
module.exports.collegeDetails=collegeDetails