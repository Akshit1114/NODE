const express = require('express');

const requestRouter = express.Router()

const {userAuth} = require("../middlewares/userAuth")

// sending connection request
requestRouter.post("/sendConnectionRequest", userAuth, async ( req , res ) => {
    const {firstName} = req.user;

    try {
        res.send(firstName + " Sent the request")
    } catch (err) {
        res.status(401).send("Error : " + message.err)
    }
})


module.exports = requestRouter;