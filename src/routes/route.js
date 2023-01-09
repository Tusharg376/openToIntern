const express=require('express')
const router= express.Router()
const controller =require('../controllers/controller')


// router.get('/test',function(req,res){
//     res.send("api is working")
// })

router.post('/functionup/colleges', controller.createCollege)
router.post('/functionup/interns', controller.createIntern)
router.get('/functionup/collegeDetails', controller.collegeDetails)






module.exports=router