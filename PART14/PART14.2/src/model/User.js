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
        unique: true,
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
        type : String,
        // making custom validate function
        validate (value) {
            if (!["male","female","others"].includes(value)){
                throw new Error ("Gender Data is not valid")
            }
        }
    },
    about : {
        type : String,
        default : "This is about section of user."
    },
    skills :  {
        type : [String]
    }
}, {
    timestamps : true            // at first time creation of document both createdAt and  updatedAt will be same, but if that doc. is updated later the updatedAt will change(or update)
})

const User = mongoose.model("User", userSchema)

module.exports = User