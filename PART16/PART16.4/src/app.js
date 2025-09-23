const express = require('express')

const ConnectDB = require("../src/config/database")

const User = require('./model/User')

const app = express()

const {validateSignUpData} = require('../utils/validation') 

const bcrypt = require('bcrypt')

const cookieParser = require("cookie-parser")

const jwt = require('jsonwebtoken')

const {userAuth} =  require('./middlewares/userAuth')

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

        // const passwordVerify = await User.verifyPassword(password)  this one wrong
        //userSchema.methods creates instance methods, not static (model-level) methods. That means verifyPassword exists on a User document instance, not on the User model itself.

        const passwordVerify = await UserFound.verifyPassword(password)

        if (passwordVerify) {

            const token = await UserFound.getJWT()

            // console.log(token)
            
            res.cookie("token", token, {expires : new Date(Date.now() + 24*60*60*1000)})  
            
            res.send("Logged In!!")
        }else {
            throw new Error("Invalid Credential")
        }

        
    } catch (err) {
        res.status(500).send("Error : " + err.message)
    }
})

// getProfile works if loggedIn
app.get("/getProfile", userAuth, async (req,res) => {
    try {

        const user = req.user
    
        res.send(user)
    }
    catch (err){
        res.status(404).send(err)
    }
})

// sending connection request
app.post("/sendConnection", userAuth, async ( req , res ) => {
    const {firstName} = req.user;

    try {
        res.send(firstName + " Sent the request")
    } catch (err) {
        res.status(401).send("Error : " + message.err)
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
