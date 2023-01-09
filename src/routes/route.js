const express=require('express')
const router= express.Router()
const controller =require('../controllers/controller')




router.post('/functionup/colleges',controller.createCollege)
router.post('/functionup/interns', controller.createIntern)
router.get('/functionup/collegeDetails', controller.collegeDetails)

router.all('/*', function(req,res){
    res.send({status:false,message:"invalid HTTP request"})})




module.exports=router