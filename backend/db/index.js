const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thebasirkhanofficial:754293@prapp.nypjwvu.mongodb.net/Paytm');
const UserSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true,minLength:4}
})
const User = mongoose.model('UserSchema',UserSchema);
const AccountSchema  = mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"UserSchema",required:true},
    balance:{type:Number,default:0},
})
const Account = mongoose.model('AccountSchema',AccountSchema);
module.exports= {
    User,
    Account
}