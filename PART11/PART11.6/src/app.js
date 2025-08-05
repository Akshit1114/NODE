const express = require('express')


const app = express()


const PORT = 3000;


app.listen(PORT, () => {
    console.log("Server is Listening on :" , PORT)
})

/* 

app.get("/user/getData" , (req,res) => {
    // logic
    throw new Error("Error") // assuming this as some rondom error, when u hit /user/getData  ur response will throw error in ugly way, this error needs to be managed/handled properly
    res.send("Data")
})

*/
/*
app.get("/user/getData" , (req,res) => {
    try {
        throw new Error("Error")
        res.send("Data")
    }
    catch (err) {
        res.status(500).send("Something went wrong")
    }
    
})
*/

/* */
app.get("/user/getData" , (req,res) => {
    // logic
    throw new Error("Error") // assuming this as some rondom error, when u hit /user/getData  ur  will see error in ugly way, this error needs to be managed/handled properly
    res.send("Data")
})

app.use("/", (err, req, res, next) => {
    
    if (err) {
        res.status(500).send("Something went wrong")
    }
})