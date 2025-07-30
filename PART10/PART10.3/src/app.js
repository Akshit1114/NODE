const express = require('express')


const app = express()


const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server is Listening on :" , PORT)
})


app.get("/users", (req, res) => {
    res.send({first_name : "Aki", last_name : "don"})
})

app.post("/users", (req, res) => {
    // logic of posting a new user to db ....
    res.send("Successfully Posted a user.")
})

app.patch("/users", (req,res) => {
    res.send("Successfully updated user.")
})

app.delete("/users", (req,res) => {
    res.send("Successfully deleted a user.")
})




