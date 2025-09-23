const express = require('express')

const ConnectDB = require("../src/config/database")

const User = require('./model/User')

const app = express()

const {validateSignUpData} = require('../utils/validation') 

const bcrypt = require('bcrypt')

const cookieParser = require("cookie-parser")

const jwt = require('jsonwebtoken')

app.use(express.json()) 

app.use(cookieParser())

const PORT = 3000;

app.post("/signup" , async (req,res) => {

    
    try {

        const {firstName,lastName,emailId,password} = req.body

        validateSignUpData(req)

        const passwordHash = await bcrypt.hash(password,10)
        console.log(passwordHash)
        
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

        if (passwordVerify) {
            // great logged in , here comes the code for jwt 

            // create jwt token

            const token = await jwt.sign({_id : UserFound._id}, "DEV@Tinder$030")
            console.log(token)
            // add the token to cookie
            // and send back to the user

            res.cookie("token", token)  // doing dry testing on getProfile
            res.send("Logged In!!")
        }else {
            throw new Error("Invalid Credential")
        }

        

        
    } catch (err) {
        res.status(500).send("Error : " + err.message)
    }
})

// getProfile works if loggedIn
app.get("/getProfile", async (req,res) => {
    try {
    // getting cookie from req
    const cookies = req.cookies

    // checking whether we got or not (without cookie-parser will get undefined)
    console.log(cookies)

    //validate token
    const {token} = cookies
    
    if (!token) {
        throw new Error("Invalid")
    }

    const decodedMessage = await jwt.verify(token, "DEV@Tinder$030")
    console.log(decodedMessage)

    const {_id} = decodedMessage;

    const user = await User.findById(_id)

    if (!user) {
        throw new Error("Invalid")
    }
    res.send(user)
    }catch (err){
        res.status(404).send(err)
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
