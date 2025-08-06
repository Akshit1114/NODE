const mongoose = require('mongoose')



// const UserSchema = new mongoose.Schema({}) takes in object
// or
// const {Schema} = require('mongoose')
// const UserSchema = new Schema({})

const userSchema = new mongoose.Schema({
    firstName : {
        type : String
    } ,
    // or firstName : String  // shorthand for { type: String }
    lastName : String,
    emailId : String,
    password : String,
    age : Number,
    gender : String
})

const User = mongoose.model("User", userSchema)

module.exports = User