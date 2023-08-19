import mongoose from "mongoose";

// define user schema
const userSchema = new mongoose.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true},
    phoneNumber:{type:String, required:true, trim:true},
    country:{type:String,trim:true},
    city:{type:String, trim:true},
    zipcode:{type:String, trim:true},
    address:{type:String},
    termsCondition:{type:Boolean, required:true, default:true},
    newsLetter:{type:String, required:true, trim:true, default:"0"},
    userStatus:{type:String, required:true, trim:true, default:"Active"},
    userRole:{type:String, required:true, trim:true, default:"user"},
    password:{type:String, required:true, trim:true},
},
    { timestamps: true }
)
const UserModel = mongoose.model("users", userSchema)
export default UserModel
