const express = require('express')

const ConnectDB = require("../src/config/database")

const User = require('./model/User')

const app = express()

app.use(express.json()) // now u would have understood this line, also why used app.'use' [no route pass meaning -> checks all possible routes]

const PORT = 3000;

app.post("/signup" , async (req,res) => {

    // console.log(req.body)  

    const user = new User(req.body)

    try {
        await user.save()

        res.send("Data Sent")
    }
    catch(err){
        res.status(500).send("Error : " + err.message )
    }  
})


// FEED api -> GET /feed  get all users
app.get("/feed", async (req,res)=>{
    try {
        const data = await User.find({});
        // console.log(data)
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
        const deletedUser = await User.findOneAndDelete({_id : userId})  // down one is shorthand
        // const deletedUser = await User.findOneAndDelete(userId)
        res.send("User Deleted : ", deletedUser)
    } catch(err) {
        console.log(err)
        res.status(500).send("Something went wrong : ", err.message)
    }
})

// Update user data

app.patch("/updateUser", async (req,res) => {
    const userId = req?.body?.userId                //userId = req.body.userId  for this --> userId : "here_comes_id"    or any other will also work , just at time of req do req.body._id : "here_comes_id" for this --> userId = _id
    const userData = req.body      // two option i) passing new data from here and then using it or ii) using it to find user and then update user with new data 
    // console.log(userId)
    // console.log(userData)
    try{
        const newData = await User.findByIdAndUpdate(userId, userData)   // const BeforeUpdateData = await User.findByIdAndUpdate(userId, userData, {returnDocument : "before"}) , 3rd parameter is options, example of one of them is ->  {returnDocument : "before"} -> now this will give data before the update happen
        res.send("User updated Successfully: ", newData)            // note if u try to update a filled which is not there in schema , that will be ignored
        // console.log(newData)
    }catch(err) {
        res.status(500).send("Something Went Wrong")
        // console.log(err)
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
