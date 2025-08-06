const express = require('express')

const ConnectDB = require("../src/config/database")

const User = require('./model/User')

const app = express()


const PORT = 3000;

app.post("/signup" , async (req,res) => {
    const UserData = {
        firstName : "chin",
        lastName : "Don",
        emailId: "chin@1.com",
        password : "123chin"
    }

    const user = new User(UserData)

    await user.save()

    res.send("Data Sent")
})

ConnectDB()
    .then(() => {
        console.log("DB Connection Successful")
        app.listen(PORT, () => {
            console.log("Server is Listening on :" , PORT)
        })
    })
    .catch(()=>{
        console.error("DB Connection Failed!!")
    })
