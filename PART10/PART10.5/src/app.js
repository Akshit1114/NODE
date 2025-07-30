const express = require('express')


const app = express()


const PORT = 3000;



app.listen(PORT, () => {
    console.log("Server is Listening on :" , PORT)
})


// app.get("/users" ,(req, res) => {
//     const queryParamter = req.query
//     console.log(req.query)
//     res.send(queryParamter)
// })



// app.get("/users/:userId" ,(req, res) => {
//     const paramsParamter = req.params
//     console.log(req.params)
//     res.send(paramsParamter)
// })

// app.get("/users/:userId/:name/:password" ,(req, res) => {
//     const paramsParamter = req.params
//     console.log(req.params)
//     res.send(paramsParamter.name)
// })
