const express = require('express')

const profileRouter = express.Router()

const {userAuth} = require("../middlewares/userAuth")

// see user profile if loggedIn

profileRouter.get("/getProfile", userAuth, async (req,res) => {
    try {

        const user = req.user
    
        res.send(user)
    }
    catch (err){
        res.status(404).send(err)
    }
})


module.exports = profileRouter;

