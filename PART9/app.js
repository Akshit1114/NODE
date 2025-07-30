const express = require('express')

// console.log(express)

const app = express()

// console.log(app)

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server is Listening on :" , PORT)
})

// express().listen(3000, () => console.log("Hello"))

app.use("/info",(req,res) => {
    res.send("Project Name : DevTinder")
})

app.use("/",(req,res) => {
    res.send("Homepage")
})


