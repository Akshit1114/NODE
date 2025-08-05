const express = require('express')


const app = express()

const {adminAuth, userAuth} = require("../middlewares/auth")

const PORT = 3000;


app.listen(PORT, () => {
    console.log("Server is Listening on :" , PORT)
})

// authorizing admin api

app.use("/admin", adminAuth)

app.use("/users", userAuth)

app.get("/users/getAllData", (req,res)=>{
    res.send("Data")
})

app.get("/admin/getAllUser", (req,res) => {
    // logic of fetching all data
    res.send("User Data")
})

app.delete("/admin/deleteAUser", (req,res) => {
        // comes the logic of deleting user
        res.send("User Deleted")
    
})

app.patch("/admin/updatingAUser", (req,res) => {
    // comes the logic of updating user
        res.send("User Deleted")
    

})

app.post("/admin/postAUser", (req,res) => {
    // comes the logic of posting/adding user
        res.send("User Added")
    
})

