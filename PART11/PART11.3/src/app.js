const express = require('express')


const app = express()


const PORT = 3000;


app.listen(PORT, () => {
    console.log("Server is Listening on :" , PORT)
})

// authorizing admin api

app.get("/admin/getAllUser", (req,res) => {
    // logic of checking whether the request is from / or not (writing simple logic or hardcoded)
    const token = "xyz"
    const isAdmin = token === "xyz"
    if (isAdmin) {
        // then comes the logic of fetching all data
        res.send("User Data")
    }
    else{
        res.status(401).send("unauthorized")
    }
})

app.delete("/admin/deleteAUser", (req,res) => {
    // logic of checking whether the request is from admin or not (writing simple logic or hardcoded)
    const token = "xyz"
    const isAdmin = token === "xyz"
    if (isAdmin) {
        // then comes the logic of deleting user
        res.send("User Deleted")
    }
    else{
        res.status(401).send("unauthorized")
    }
})

app.patch("/admin/updatingAUser", (req,res) => {
    // logic of checking whether the request is from admin or not (writing simple logic or hardcoded)
    const token = "xyz"
    const isAdmin = token === "xyz"
    if (isAdmin) {
        // then comes the logic of updating user
        res.send("User Deleted")
    }
    else{
        res.status(401).send("unauthorized")
    }
})

app.post("/admin/postAUser", (req,res) => {
    // logic of checking whether the request is from admin or not (writing simple logic or hardcoded)
    const token = "xyz"
    const isAdmin = token === "xyz"
    if (isAdmin) {
        // then comes the logic of posting/adding user
        res.send("User Added")
    }
    else{
        res.status(401).send("unauthorized")
    }
})

// we see we need to write the auth logic again for each admin route or admin api
// instead we can just create a auth method which authorizes the admin and then do the respective work
// here comes middleware concept : as auth method act in middle of this flow, so we can create a auth middle work which will do authorization and then will do/call next method
// so for that refer/go to PART11.4