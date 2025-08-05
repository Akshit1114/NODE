const express = require('express')


const app = express()


const PORT = 3000;


app.listen(PORT, () => {
    console.log("Server is Listening on :" , PORT)
})

// authorizing admin api

app.use("/admin" , (req, res, next) => {
    // logic of checking whether the request is from / or not (writing simple logic or hardcoded)
    const token = "xyz"
    const isAdmin = token === "xyz"
    if (!isAdmin) {
        res.status(401).send("unauthorized")
    }
    else{
        // so for every /admin request above code executes and then move on
        next()
    }
} )

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

