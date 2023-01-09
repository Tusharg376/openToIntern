const collegeModel= require('../models/collegeModel')
const internModel=require('../models/internModel')
const ObjectId=require('mongoose').Types.ObjectId




const createCollege = async function(req,res){
    try {
	let data =  req.body
	    let {name,fullName,logoLink} = data
	    if(!name) return res.status(400).send({status:false,message:"Please provide name"})
        fullName=fullName.trim()
	    if(!fullName) return res.status(400).send({status:false,message:"Please provide fullName"})
        if(!logoLink) return res.status(400).send({status:false,message:"Please provide logoLink"})
    
        if(!logoLink.match(/^https?:\/\/(.*)/))return res.status(400).send({status:false,msg:"invalid link"})
	    let checkName = await collegeModel.find({$and:[{name:name, isDeleted:false}]})
	    if(checkName.length !=0) return res.status(400).send({status:false,message:"Unique name is required"})
	    let finalData = await collegeModel.create(data)
	    res.status(201).send({status:true,data:finalData})
} catch (error) {
    res.status(500).send({status:false,message:error.message})
}

}

const createIntern=async function(req,res){
    try{
        const data=req.body
        if(!data) return res.status(400).send({status:false,msg:"to create Intern body data is required"})
        if(!data.name) return res.status(400).send({status:false,msg:"name is mandatory"})

        if(!data.email) return res.status(400).send({status:false,msg:"email is mandatory"})
        if(!data.email.match(/.+\@.+\..+/)) return  res.status(400).send({status:false,msg:"invalid email"})
        let ifData = await internModel.findOne({email:data.email})
        if(ifData) return res.status(400).send({status:false,msg:"email already exist"})

        if(!data.mobile) return res.status(400).send({status:false,msg:"mobile is mandatory"})
        if(!data.mobile.match(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)) return res.status(400).send({status:false,msg:"invailid mobile number"})
        ifData = await internModel.findOne({mobile:data.mobile})
        if(ifData) return res.status(400).send({status:false,msg:"mobile already exist"})

        if(!data.collegeId) return res.status(400).send({status:false,msg:"college name/Id is required"})
        if(!ObjectId.isValid(data.collegeId)) return res.status(400).send({status:false,msg:"Object id Invalid with that you want to create intern"})
        const college= await collegeModel.findOne({_id:data.collegeId, isDeleted:false })
        if(!college) return res.status(404).send({status:false,msg:"college not found"})
        
        const saveData= await internModel.create(data)
        return res.status(201).send({status:true,data:saveData})
    }
    catch(err){
        res.status(500).send({status:false,msg:err.message})
    }
}

const collegeDetails= async function(req,res){
    const clgId= req.query.collegeId
    if(!clgId) return res.status(400).send({status:false,msg:"query is required to get college details"})
    if(!ObjectId.isValid(clgId))  return res.status(400).send({status:false, msg:"Object id Invalid with that you want to get details"})
    let data = await internModel.find({collegeId:clgId,isDeleted:false}) 
    if(data.length==0) data=["No intern found"]
    let collegeDetail = await collegeModel.findOne({_id:clgId,isDeleted:false}).select({name:1,fullName:1,logoLink:1,_id:0})
    if(!collegeDetail) return res.status(404).send({status:false, msg:"details not found"})
    collegeDetail = collegeDetail.toObject();
    collegeDetail['interns']=data
    return res.status(200).send({status:true,data:collegeDetail})
    
}









module.exports.createCollege=createCollege
module.exports.createIntern=createIntern
module.exports.collegeDetails=collegeDetails