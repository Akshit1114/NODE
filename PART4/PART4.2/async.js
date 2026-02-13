// This has some async task

const https = require('https')   // this code execute in sync way/fashion 
const fs = require('fs')   // this code execute in sync way/fashion 

console.log("Hello")     // this code execute in sync way/fashion 

var a = 1393232     // this code execute in sync way/fashion 
var b = 9532583       // this code execute in sync way/fashion 
  
// this code execute in sync way/fashion but it takes time and this is gonna block the main thread, will take time until rest of the code has too wait
fs.readFileSync("./file.txt", "utf-8")  // (help : PART4/PART4.2/file.txt)
console.log("Above code blocks the main thread")


// api call

https.get("https://dummyjson.com/quotes",        // this code execute in async way/fashion , doesn't block main thread
    (res) => {
        console.log("Fetched data Successfully")
    }
)

/*  Upper part related
 Why Node.js still waits:
Because res (the response stream) is still open, and Node internally tracks that as a pending task or handle.

Node thinks:

"This HTTP stream might still be used. I won’t exit yet."

That’s why your process hangs until Node decides the socket has timed out or been implicitly closed.
*/

// https.get("https://dummyjson.com/quotes", (res) => {
//     res.on('data', () => {}); // consume chunks
//     res.on('end', () => {
//         console.log("Fetched data Successfully"); // now it's truly done
//     });
// });

// Time out

setTimeout(() => {        // this code execute in async way/fashion , doesn't block main thread
    console.log("After 5 secs")
},5000)
 
// reading some file

fs.readFile("./file.txt", "utf-8",          // this code execute in async way/fashion , doesn't block main thread
     (err,data) => {
        console.log("File Data :", data)
     }
    )


function multiply(a,b) {          // this code execute in sync way/fashion 
    const res = a*b
    return res
}

var c = multiply(a,b)          // this code execute in sync way/fashion 

console.log("Answer : ", c)        // this code execute in sync way/fashion 

// can check blocking.js file for more clear understanding of blocking mean thread