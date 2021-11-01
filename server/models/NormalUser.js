import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
firstName:{
    type:String,
    required:[true,"firstname is required"]

},
lastName:String,

email: {
    type: String,
    required: [true, "email is required"]

},
nationalId:{
    type:String,
    required:true,
    unique:true

},
password:{
    type:String,
    default:"12345@@@@"
},
phone:{
    type:String
    
},
gender:{
    type:String,
    enum:["Male","Female"]
},
age:Number,
role:{
    type:String,
    enum:["admin","user","Employee"],

    default:"user"
},
status:{
    type:String,
    enum:["active","inactive"],
    default:"active"
},
registeredOn: {
    type: String,
    default: Date.now(),
  },
  address: {type:String,
    default:"Rwanda"},
});


 const userInfo = mongoose.model("User", userSchema);

 export default userInfo;