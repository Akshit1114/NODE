const fs = require('fs')

const a = 1000

setTimeout(() => console.log("I am SetTimeOut"), 0)

Promise.resolve("I am a Promise").then(console.log)

fs.readFile("./file.txt", "utf-8", () => {

    setTimeout(() => console.log(" --  I am SetTimeOut 2 -- "), 0) 

    Promise.resolve(" I am a Promise 2").then(console.log)

    setImmediate(() => console.log(" I am SetImmediate 2"))

    process.nextTick(() => {  
        setTimeout(() => console.log(" --  I am inner SetTimeOut 2 -- "), 0)   
        process.nextTick(()   => console.log("  I am inner process.nextTick 2"))
        console.log(" I am process.nextTick 2")
    })


    console.log("File Read")
})

setImmediate(() => console.log("I am SetImmediate"))

process.nextTick(() => console.log("I am process.nextTick"))

function printA() {
    console.log("A = " , a)
}

printA()

console.log("-- I am last line ---")