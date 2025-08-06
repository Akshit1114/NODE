
const mongoose = require('mongoose')

/*
const ConnectCluster = async () => {
    await mongoose.connect("mongodb+srv://akshitpjt07:akiCap@cluster0.zwuzzvp.mongodb.net/")
}

ConnectCluster()
.then( () => {
    console.log(" Database Connected Successfully :) ")
} )
.catch((err) => {
    console.error(" !!!Failed :( ")
})
*/
// console.log(mongoose.version);
const ConnectDB = async () => {
    await mongoose.connect("mongodb+srv://akshitpjt07:akiCap@cluster0.zwuzzvp.mongodb.net/devTinder")             // add db name u want to connect at end, if there it will connect else will create with the written name
}



module.exports = ConnectDB