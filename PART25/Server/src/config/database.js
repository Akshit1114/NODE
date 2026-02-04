
const mongoose = require('mongoose')


const ConnectDB = async () => {
    await mongoose.connect("mongodb+srv://akshitpjt07:akiop1114@cluster0.zwuzzvp.mongodb.net/devTinder") 
}



module.exports = ConnectDB