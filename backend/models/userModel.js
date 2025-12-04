import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
      
    },
    password:{
        type:String,
        required:true,
        minlength: 6
    },
    profilePic:{
        type:String,
        default:""
    },
    username:{
        type:String,
        required:true,
        unique:true
    },followers:{
        type:[String],
        default:[]
    },following:{
        type:[String],
        default:[]
    },bio:{
        type:String,
        default:""
    },
    isFrozen:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
const User=mongoose.model("User",userSchema)
export default User;