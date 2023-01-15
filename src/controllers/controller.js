const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const ObjectId = require('mongoose').Types.ObjectId




const createCollege = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        let data = req.body
        if (!data.name) return res.status(400).send({ status: false, message: "Please provide name" })
        if (!data.name.match(/^[a-zA-z]+([\s][a-zA-Z]+)*$/)) return res.status(400).send({ status: false, msg: "invalid name" })
        data.fullName = data.fullName.trim()
        data.name = data.name.trim().toUpperCase()
        if (!data.fullName) return res.status(400).send({ status: false, message: "Please provide fullName" })
        if (!data.fullName.match(/^[a-zA-z]+([\s][a-zA-Z]+)*$/)) return res.status(400).send({ status: false, msg: "invalid full Name" })
        if (!data.logoLink) return res.status(400).send({ status: false, message: "Please provide logoLink" })

        data.logoLink = data.logoLink.trim()
        if (!data.logoLink.match(/^https?:\/\/+(.)+(.gif|.jpe?g|.tiff?|.png|.webp|.bmp)$/)) return res.status(400).send({ status: false, msg: "invalid link" })
        let checkName = await collegeModel.find({ $and: [{ name: data.name, isDeleted: false }] })
        if (checkName.length != 0) return res.status(400).send({ status: false, message: "Unique name is required" })

        let finalData = await collegeModel.create(data)
        res.status(201).send({ status: true, data: finalData })
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const createIntern = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        const data = req.body
        if (!data) return res.status(400).send({ status: false, msg: "data is required" })
        if (!data.name) return res.status(400).send({ status: false, msg: "name is mandatory" })

        data.email = data.email.trim()
        if (!data.email) return res.status(400).send({ status: false, msg: "email is mandatory" })
        if (!data.email.match(/.+\@.+\..+/)) return res.status(400).send({ status: false, msg: "invalid email" })
        let ifData = await internModel.findOne({ email: data.email })
        if (ifData) return res.status(400).send({ status: false, msg: "email already exist" })

        data.mobile = data.mobile.trim()
        if (!data.mobile) return res.status(400).send({ status: false, msg: "mobile is mandatory" })
        if (!data.mobile.match(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/)) return res.status(400).send({ status: false, msg: "invalid mobile number" })
        ifData = await internModel.findOne({ mobile: data.mobile })
        if (ifData) return res.status(400).send({ status: false, msg: "mobile already exist" })

        data.collegeName = data.collegeName.trim().toUpperCase()
        if (!data.collegeName) return res.status(400).send({ status: false, msg: "college name is required" })


        const college = await collegeModel.findOne({ name: data.collegeName, isDeleted: false })
        if (!college) return res.status(404).send({ status: false, msg: "college not found" })

        data.collegeId = college._id
        const saveData = await internModel.create(data)
        return res.status(201).send({ status: true, data: saveData })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const collegeDetails = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        const clgName = req.query.collegeName.toUpperCase()
        if (!clgName) return res.status(400).send({ status: false, msg: "query is required to get college details" })
        let clg = await collegeModel.findOne({ name: clgName, isDeleted: false }) 
        if (!clg) return res.status(400).send({ status: false, msg: "college not found" })
        let data = await internModel.find({ collegeId: clg._id, isDeleted: false }).select(['_id', 'name', 'email', 'mobile'])
        if (data.length == 0) data = ["No intern found"]
        let {name,fullName,logoLink} = clg
        return res.status(200).send({ status: true, data:{name,fullName,logoLink,data} })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}


module.exports.createCollege = createCollege
module.exports.createIntern = createIntern
module.exports.collegeDetails = collegeDetails


