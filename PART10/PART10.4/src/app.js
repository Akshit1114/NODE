const express = require('express')


const app = express()


const PORT = 3000;



app.listen(PORT, () => {
    console.log("Server is Listening on :" , PORT)
})

// ----------------------------
// app.get("/users", (req, res) => {                                   // works for particularly ->  /users 
//     res.send({first_name : "Aki", last_name : "don"})
// })
// ----------------------------
// app.use("/users", (req, res) => {                                   // works for any after  ->  "/users/".....something  ex : /users, /users/users,  /users/users/users, /users/123, /users/fiwfi, /users/x1r3
//     res.send({first_name : "Aki", last_name : "don"})
// })
// ----------------------------
// app.use("/")  any route works || It matches every single route.
// ---------------------------- pattern using a regular expression-like syntax.



// app.get("/ab\\+c" , (req, res) => {                                               // escaping special charcter     
//     res.send({first_name : "Aki", last_name : "don"})
// } )



// app.get(/\/ab+c/ , (req, res) => {   // (other character from path)a and c charcters should also be there, b can be more than one or one time but in between , no other charcter near a,b,c
//     res.send({first_name : "Aki", last_name : "don"})
// } )

// app.get(/\/ab?c/, (req,res) => {                       // make preceding element optional here b so both works : /abc and /ac
//     res.send({first_name : "Aki", last_name : "don"})
// })

// app.get(/\/ab*cd/, (req,res) => {                        // (other character from path)a and c charcters should also be there, b can be zero or more than zero but in between of the the charcters, no other charcter near a,b,c
//     res.send({first_name : "Aki", last_name : "don"})
// })

// app.get(/\/ab.c/, (req,res)=>{                             // matches any single character if put in between , but has to be present ex- /ab1c, abzc, abbc, ab-c but not this - /abc
//     res.send({first_name : "Aki", last_name : "don"})
// })

// app.get(/\/a(ha)?c/, (req,res) => {                       // make preceding group [here : (ha)] optional here b so both works : /ahac, ac
//     res.send({first_name : "Aki", last_name : "don"})
// })

// app.get(/\/a(ha)+c/ , (req, res) => {   // (other character from path)a and c charcters should also be there, (ha) can be more than one or one time but in between , no other charcter near a,(ha),c
//     res.send({first_name : "Aki", last_name : "don"})
// })

// app.get(/\/[abc]/, (req,res) => {             /*matches exactly one character that is either a, b, or c. It doesn't require all of them or multiple characters - just one character from that set. */
//     res.send({first_name : "Aki", last_name : "don"})
// })

// app.get(/.*fly$/ , (req,res)=> {
//     res.send({first_name : "Aki", last_name : "don"})
// })

// app.get(/\/[abc]$/, (req, res) => {
//     res.send({first_name : "Aki", last_name : "don"})
// })

/*

Breaking down /\/[abc]$/:

\/ - matches the literal forward slash /
[abc] - matches exactly one character that is either a, b, or c
$ - end of string anchor

So for /ab:

\/ matches the / ✓
[abc] matches the a ✓
$ expects the string to end here, but there's still a b remaining ✗

[abc] alone would allow /ab, but the $ anchor forces the string to end immediately after the single character from the set, making /ab fail to match.
*/