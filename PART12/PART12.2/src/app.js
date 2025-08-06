const express = require('express')

const ConnectDB = require("../src/config/database")

const User = require('./model/User')

const app = express()


const PORT = 3000;

// with error handling via try-catch

app.post("/signup" , async (req,res) => {
    // const UserData = {
    //     firstName : "ram",
    //     lastName : "Don",
    //     emailId: "ram@1.com",
    //     password : "123ram"
    // }

    const user = new User({
        firstName : "ram",
        lastName : "Don",
        emailId: "ram@1.com",
        password : "123ram"
    })

    try {
        await user.save()

        res.send("Data Sent")
    }
    catch(err){
        res.status(500).send("Error : " + err.message )
    }

    
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
