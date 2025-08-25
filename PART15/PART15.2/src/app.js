const express = require('express')

const ConnectDB = require("../src/config/database")

const User = require('./model/User')

const app = express()

const {validateSignUpData} = require('../utils/validation')

const bcrypt = require('bcrypt')

app.use(express.json()) 

const PORT = 3000;

app.post("/signup" , async (req,res) => {

    
    try {

        const {firstName,lastName,emailId,password} = req.body

        validateSignUpData(req)

        const passwordHash = await bcrypt.hash(password,10)
        console.log(passwordHash)
        
        // const user = new User(req.body)       // very bad way of creating instance as we are saving whole req.body to db, but we need limited and required data only
        const user = new User({firstName,lastName,emailId,
            password : passwordHash })

        await user.save()

        res.send("Data Sent")
    }
    catch(err){
        res.status(500).send("Error : " + err.message )
    }  
})

// login api

app.post("/login" , async (req, res) => {
    try {
        const { emailId, password} = req.body

        const UserFound = await User.findOne({emailId : emailId})

        if (!UserFound) {
            throw new Error("Invalid Credential")
        }

        const passwordVerify = await bcrypt.compare(password, UserFound.password)

        if (!passwordVerify) {
            throw new Error("Invalid Credential")
        }

        res.send("Logged In!!")

        
    } catch (err) {
        res.status(500).send("Error : " + err.message)
    }
})


// FEED api -> GET /feed  get all users
app.get("/feed", async (req,res)=>{
    try {
        const data = await User.find({});
        res.send(data)
    } catch (err) {
        res.status(500).send("Something went wrong : ", err.message)
    }
})

/*
// get user via their email id
 app.get("/feed" , async (req,res) => {
    const userEmailId = req.query.emailId
    try{
        const UserData = await User.find({emailId : userEmailId})            // return an array of all users which have that particular userEmailId
        if (UserData.length === 0) {
            res.status(404).send("User Not Found")
        }else{
            res.send(UserData)
        }
    }
    catch(err){
        res.status(500).send("Something Went Wrong")
    }
}) 
*/

app.delete("/delete", async(req,res) => {
    const userId = req.body.userId
    try{ 
        const deletedUser = await User.findOneAndDelete({_id : userId}) 
        res.send("User Deleted : ", deletedUser)
    } catch(err) {
        console.log(err)
        res.status(500).send("Something went wrong : ", err.message)
    }
})

// Update user data

// app.patch("/updateUser", async (req,res) => {
//     const userId = req?.body?.userId             
//     const userData = req.body     

//     try{
//         const newData = await User.findByIdAndUpdate(userId, userData,
            
//            { runValidators : true }
//         )    
//         res.send("User updated Successfully")            
//     }catch(err) {
//         res.status(500).send("Something Went Wrong" + err.message)

//     }
// })

// changing the method of extracting userId , using paramas in url and extracting
app.patch("/updateUser/:userId" , async ( req , res ) => {
    // console.log(req.params)
    const userId = req?.params?.userId
    const dataFromBody = req.body
    const ALLOWED_UPDATES = ["skills", "about", "photoUrl" ] // add more if u want to add 
    const isUpdateAllowed = Object.keys(dataFromBody).every((key) => ALLOWED_UPDATES.includes(key))
    try {
        if (!isUpdateAllowed) {  // if isUpdateAllowed is false means this condition is true
            throw new Error("Invalid Data Upadte")
        }
        if (dataFromBody.skills?.length > 10) {
            throw new Error("Max skills can only be set to 10")
        }
        const newData = await User.findByIdAndUpdate(userId, dataFromBody, {runValidators : true})
        res.send("Data Updated")
    } catch (err) {
        res.status(500).send(err.message)
    }

})



/* 
// updating user via email
app.patch("/updateUser", async (req,res) => {
    const userEmailId = req.body.emailId
    const newData = req.body
    try{
        const Data = await User.updateOne({emailId:userEmailId},newData)
        console.log(Data)
        res.send("Updated!")
    }catch(err){
        res.status(500).send("Something Went Wrong")
    }
})
*/

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
