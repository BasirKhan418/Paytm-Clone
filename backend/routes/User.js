const express = require('express');
const {User, Account} = require("../db/index")
const {AES_SECRET,JWT_SECRET} = require("../config");
var CryptoJS = require("crypto-js");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const router = express.Router();
const AuthMiddleware = require("../middleware/index")

router.get("/",async(req,res)=>{
    try{
     const filter = req.query.filter||" ";
     const users = await User.find({$or:[{
      name:{"$regex":filter},
     },{
      email:{"$regex":filter}   
     }]},{
        password:0
     })
     return res.status(200).json({status:true,users:users})
    }
    catch(err){
        res.status(400).json({status:false,message:"Some thing went wrong try agin after some time "+err})
    }
})
router.get("/me",AuthMiddleware,async(req,res)=>{
res.status(200).json({status:true,user:req.user})
});
router.post("/signup",async(req,res)=>{
    const zodSchema = zod.object({
        name:zod.string(),
        email:zod.string().email(),
        password:zod.string().min(5)
    })
    const data = req.body;
    console.log(data);
    try{
    const result= zodSchema.safeParse(data);
    if(!result.success){
        return res.status(400).json({status:false,message:"Invalid input",error:result.error.errors})
    }
    const isexist = await User.findOne({email:data.email})
    if(isexist){
        return res.status(400).json({status:false,message:"User already exist"})
    
    }
    let pass = CryptoJS.AES.encrypt(data.password,AES_SECRET).toString();
   let a = await User.create({
        name:data.name,
        email:data.email,
        password:pass
    })
    await Account.create({
        userid:a._id,
        balance:Math.floor(Math.random()*10000)
    })
    let token = jwt.sign({email:data.email,name:data.name,id:data._id},JWT_SECRET);
    res.status(200).json({status:true,message:"User created successfully",token:token});
    }
    catch(err){
        res.status(400).json({status:false,message:"Some thing went wrong try agin after some time "+err})
    }
})
router.post("/signin",async(req,res)=>{
try{
const zodSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(5)
})
const result = zodSchema.safeParse(req.body);
if(!result.success){
    return res.status(400).json({status:false,message:"Invalid input",error:result.error.errors})
}
const user = await User.findOne({email:req.body.email});
if(!user){
    return res.status(400).json({status:false,message:"User not found"})
}
const dpass = CryptoJS.AES.decrypt(user.password,AES_SECRET).toString(CryptoJS.enc.Utf8);
console.log(dpass);
if(dpass!==req.body.password){
    return res.status(400).json({status:false,message:"Invalid password"})
}
else{
    let token = jwt.sign({email:user.email,name:user.name,id:user._id},JWT_SECRET);
    res.status(200).json({status:true,message:"User logged in successfully",token:token});
}
}
catch(err){
    res.status(400).json({status:false,message:"Some thing went wrong try agin after some time "+err})
}
})

//update user
router.put("/",AuthMiddleware,async(req,res)=>{
    try{
const zodSchema = zod.object({
    email:zod.string().email().optional(),
    password:zod.string().min(5).optional(),
    name:zod.string().optional()
})
const result = zodSchema.safeParse(req.body);
if(!result.success){
    return res.status(400).json({status:false,message:"Invalid input",error:result.error.errors})

}
if(req.body.password){
    let pass = CryptoJS.AES.encrypt(req.body.password,AES_SECRET).toString();
    const user = await User.findOneAndUpdate({
        email:req.body.email
    },{
        password:pass,
        name:req.body.name
    })
    if(!user){
        return res.status(400).json({status:false,message:"User not found"})
    }
    else{
        return res.status(200).json({status:true,message:"User updated successfully"})
    }
}
else{
    const user = await User.findOneAndUpdate({
        email:req.body.email
    },{
        name:req.body.name
    })
    if(!user){
        return res.status(400).json({status:false,message:"User not found"})
    }
    else{
        return res.status(200).json({status:true,message:"User updated successfully"})
    }
}

    }
    catch(err){
        res.status(400).json({status:false,message:"Some thing went wrong try agin after some time "+err})
    }
})

module.exports=router;