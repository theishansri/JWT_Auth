const router=require('express').Router();
const private=require('./verifytoken')

router.get('/',private,(req,res)=>{
    res.send("My Post shouldn't access without token")
})
module.exports=router;