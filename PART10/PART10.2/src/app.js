const express = require('express')


const app = express()


const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server is Listening on :" , PORT)
})


app.use("/info",(req,res) => {
    res.send("Project Name : DevTinder")
})

app.use("/",(req,res) => {
    res.send("Homepage")
})


