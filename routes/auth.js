const router=require('express').Router();
const userModel=require('../models/User-model');
const jwt=require('jsonwebtoken')
const {register_validation,login_validation}=require('./validation')
const bcrypt=require('bcryptjs')

router.post('/register',async (req,res)=>{
    //Validate user
    const {error}=register_validation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const emailExists = await userModel.findOne({email:req.body.email})
    if(emailExists){
        return res.status(400).send('Email Already Exists');
    }
    //Encrypt Password
    const salt=await bcrypt.genSalt(10);
    const hashpassword= await bcrypt.hash(req.body.password,salt)
    //Create User
    const user=new userModel({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword
    });
    //Save User
    try {
        const savedUser=await user.save();
        res.send({user:user._id});    
    } catch (error) {
        res.status(400).send('Server Error '+error.message)
    }
});

router.post('/login',async  (req,res)=>{
    const {error}=login_validation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const user = await userModel.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send("User doesn't exist please register")
    }
    const valid_pass=await bcrypt.compare(req.body.password,user.password)
    if(!valid_pass){
        return res.status(400).send("Password is wrong")
    }
    //Create JWT token if all user details are correct
    const token=jwt.sign({_id:user.id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)


})
module.exports=router;

