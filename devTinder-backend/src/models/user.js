const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
       maxlength : 20
    },
    lastName : { 
        type:String,
    },
    emailId:{
        type : String,
        lowercase : true,
        required : true,
        unique : true,
        trim : false,
        validate(value){
            if(validator.isEmail(value)){
                throw new Error("Email is invalid");
        }
    }
        
    },
    password: {
        type:String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is weak"+value)
            }
        }
    },
    age :{
        type:Number,
        min:18,  
    },
    gender :{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is invalid")
            }
        }
    },
    photoUrl :{
        type: String,
        default:"https://www.pngitem.com/pimgs/m/22-224000_profile-pic-dummy-png-transparent-png.png",
        validat(value){
            if(!validator.isURL(value)){
                throw new Error("URL is invalid")
            }
        }
    },
    about:{
        type : String,
        default : "This is the default descriiption of the user",
    },
    skills:{
        type : [String],
    },
},
{
    timestamps : true
});

const User = mongoose.model("User",userSchema);
module.exports = User;