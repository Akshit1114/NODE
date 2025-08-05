const express = require('express')


const app = express()


const PORT = 3000;


app.use("/users", (req, res) => {
    // sending no response -> u will see an infifnte loop of sending request at postman or browser
    console.log("Will be executed or printed, but no response seen or send")
})

app.listen(PORT, () => {
    console.log("Server is Listening on :" , PORT)
})


// app.use("/users", (req, res) => {
//     // sending no response -> u will see an infifnte loop of sending request at postman or browser
// })
