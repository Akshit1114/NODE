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
    }).populate("fromUserId", "firstName lastName") // if u dont pass the second parameter then it will return whole User to u with all details which can be bad
    // }).populate("fromUserId", ["firstName" , "lastName"])

    res.json({
        message : "Fetched Successfully",
        data : ReceivedConnectionRequest
    })

    } catch(err) {
        res.status(400).send("Error : " + err.message)
    }

})


// to get all the conntions of a user (accepted once)
userRouter.get("/getConnectedUsers" , userAuth , async (req,res) => {

    try {

        const loggedInUser = req.user

        const getConnectedUsers = await ConnectionRequest.find({

            $or : [
                {fromUserId : loggedInUser._id, status : "accepted"},
                {toUserId : loggedInUser._id, status : "accepted"}
            ]

        }).populate("fromUserId" , "firstName lastName").populate("toUserId", "firstName lastName" )

        // Extracting the other user (not the loggedIn)
        const connectedUser = getConnectedUsers.map((conn) => {
            if (conn.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return conn.toUserId
            }else{
                return conn.fromUserId
            }
        })

        res.status(200).json({
            message : "All Your Connections.",
            data : connectedUser
        })


    } catch (err) {
        res.status(400).send("Error : " + err.message)
    }


})

module.exports = userRouter;