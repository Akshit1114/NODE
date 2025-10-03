const express = require('express')

const userRouter = express.Router()

const {userAuth} = require('../middlewares/userAuth')

const ConnectionRequest = require('../model/ConnectionRequest')

// get all the pending connection Request for the user
userRouter.get("/getRequest/received", userAuth, async (req, res) =>{
    
    try {

    const loggedInUser = req.user;

    const ReceivedConnectionRequest = await ConnectionRequest.find({
        toUserId : loggedInUser._id,                             // i want request which people has to sent to the loggedin user and only the interested once
        status  : "interested"
    })

    res.json({
        message : "Fetched Successfully",
        data : ReceivedConnectionRequest
    })

    } catch(err) {
        res.status(400).send("Error : " + err.message)
    }

})

module.exports = userRouter;