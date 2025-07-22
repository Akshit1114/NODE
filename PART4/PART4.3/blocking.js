const crypto = require("crypto");  // crypto is nodejs core module [extra utilites given by nodejs , so node does not only give v8 or libuv, it also gives a lot of things]
// another way to call node core module --->  const crypto = require("node:crypto"); 

console.log("Hello World")

var a = 93583
var b = 93593



// pbkdf -> password based key derivative function
crypto.pbkdf2Sync("TypeUrPasswordHere", "salt", 5000000, 50,"sha512") // this code gonna block main thread, no point of callback fn use as this gonna block main thread

console.log("Key is generated")

crypto.pbkdf2("TypeUrPasswordHere", "salt", 5000000, 50,"sha512", (err, key) => {  // this code gonna not block main thread
    console.log("Key is generated")
} )

function multiply(a,b) {
    const result = a*b
    return result
}

var c = multiply(a,b)
console.log("Answer: ", c)
