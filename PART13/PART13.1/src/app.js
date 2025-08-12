const express = require('express')

const ConnectDB = require("../src/config/database")

const User = require('./model/User')

const app = express()

app.use(express.json()) // now u would have understood this line, also why used app.'use' [no route pass meaning -> checks all possible routes]

const PORT = 3000;

app.post("/signup" , async (req,res) => {

    // const user = new User({     // now this data can't be like this : hardcoded, it would be like : I get the request of sending this data from user (from client via something like a signup form // or more technical say : via request body) and then saving it to DB
    //     firstName : "jay",
    //     lastName : "Don",
    //     emailId: "jay@1.com",
    //     password : "123jay"
    // })
    // will use req to get data ? but where in request -> in req.body
    console.log(req.body)   // --> will get undefined [if this not written : app.use(express.json())] bcoz from postman data is sent as json and here body don't (have idea or) deal with json, 
    // it not to be js object for futher working. And this will be need almost everywhere we work with json data incoming. 
    // Will create a middleware which converts json into js object (my own) or we use middleware given by express itself

    const user = new User(req.body)

    // know logically: req.body = {  
    //     firstName : "jay",
    //     lastName : "Don",
    //     emailId: "jay@1.com",
    //     password : "123jay"
    // }

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
