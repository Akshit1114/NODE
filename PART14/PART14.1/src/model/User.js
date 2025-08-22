const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 3
    } ,
    lastName : {
        type : String
    },
    emailId :{
        type : String,
        required : true,
        trim : true,              // saves id after trimming
        lowercase : true          //saves emailId in lowercase
    },
    password : {
        type : String
    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String
    },
    about : {
        type : String,
        default : "This is about section of user."
    },
    skills :  {
        type : [String]
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User