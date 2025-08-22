const express = require('express')

const ConnectDB = require("../src/config/database")

const User = require('./model/User')

const app = express()

app.use(express.json()) 

const PORT = 3000;

app.post("/signup" , async (req,res) => {


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
    const userId = req?.body?.userId             
    const userData = req.body     

    try{
        const newData = await User.findByIdAndUpdate(userId, userData,
            
           { runValidators : true }
        )    // findByIdAndUpdate(id , [update], [options] <-- it has these 3 parameters and in [options] we get [options.runValidators] which by default set to fasle but to run the defined custom validation we need to start it true)
        // console.log(userData)
        res.send("User updated Successfully")            
    }catch(err) {
        res.status(500).send("Something Went Wrong" + err.message)

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
