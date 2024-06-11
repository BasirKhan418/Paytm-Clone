const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config")
const AuthMiddleware = (req,res,next)=>{
    try{
  const authheader = req.headers.authorization;

  const token = authheader.split(" ")[1];
  let a = jwt.verify(token,JWT_SECRET);
  if(a){
    req.user = a;
    next();
  }
  else{
    res.status(401).json({status:false,message:"Unauthorized access not allowed"})
  
  }
    }
    catch(err){
        res.status(400).json({status:false,message:"Some thing went wrong try agin after some time "+err})
    }
}
module.exports=AuthMiddleware;