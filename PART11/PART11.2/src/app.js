const express = require('express')


const app = express()


const PORT = 3000;


app.listen(PORT, () => {
    console.log("Server is Listening on :" , PORT)
})

// Single RH
// app.use("/users", (req, res) => {
//     console.log("1st Route handler")
//     res.send("hello")
// })

// mutiple route handler
// ****************
// app.use("/users" ,(req, res,next) => {
//     console.log("1")
//     res.send("1st Response")
//     next()
// }, (req,res) => {
//     console.log("2")
//     res.send("2nd Response")
// })


// *****************
// app.use("/users" ,(req, res,next) => {
//     console.log("1")
//     next()
// }, (req,res) => {
//     console.log("2")
//     res.send("2nd Response")
// })

// *****************
// app.use("/users" ,(req, res,next) => {
//     next()
//     console.log("1")
//     res.send("1st Response")
// }, (req,res) => {
//     console.log("2")
//     res.send("2nd Response")
// })


// --------------------------------
// app.use("/users" ,(req, res,next) => {
//     console.log("1")
//     next()
// }, (req,res) => {
//     console.log("2")
// })               /// here not handling the res, hang from req sending [no errors]

// app.use("/users" ,(req, res,next) => {
//     console.log("1")
//     next()
// }, (req,res, next) => {
//     console.log("2")
//     next()
// })               /// here error thrown as next route handler is expected
// -------------------------------

// *****************************
app.use("/users" ,(req, res,next) => {
    console.log("1")
    // res.send("1nd Response")
    next()
}, (req,res,next) => {
    console.log("2")
    // res.send("2nd Response")
    next()
}, (req,res,next) => {
    console.log("3")
    // res.send("3th Response")
    next()
}, (req,res,next) => {
    console.log("4")
    // res.send("4th Response")
    next()
}, (req,res,next) => {
    console.log("5")
    res.send("5th Response")
})

/*
app.use("/route", rh1, rh2, rh3, rh4, rh5)  == app.use("/route", [rh1, rh2, rh3, rh4, rh5]) == app.use("/route", [rh1, rh2], rh3, rh4, rh5) == app.use("/route", [rh1], rh2, rh3, rh4, rh5) == app.use("/route", rh1, [rh2, rh3], rh4, rh5)
---------------
app.use("/users" , [(req, res,next) => {
    console.log("1")
    // res.send("1nd Response")
    next()
}, (req,res,next) => {
    console.log("2")
    // res.send("2nd Response")
    next()
}, (req,res,next) => {
    console.log("3")
    // res.send("3th Response")
    next()
}, (req,res,next) => {
    console.log("4")
    // res.send("4th Response")
    next()
}, (req,res,next) => {
    console.log("5")
    res.send("5th Response")
}])
*/

/*
app.use("/users", (req, res, next) => {
    console.log("First")
    next()
})
app.use("/users", (req, res, next) => {
    console.log("Second")
    res.send("2nd Response")
})
*/


/*
app.use("/users", (req, res, next) => {
    console.log("Second")
    res.send("2nd Response")
})
app.use("/users", (req, res, next) => {
    console.log("First")
    next()
})
*/

/*
app.use("/users", (req, res, next) => {
    console.log("First")
    next()
})
app.use("/users", (req, res, next) => {
    console.log("Second")
    next()
})
*/