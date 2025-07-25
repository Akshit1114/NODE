const fs = require('fs')

const a = 1000

setTimeout(() => console.log("I am SetTimeOut"), 0)

Promise.resolve("I am a Promise").then(console.log)

fs.readFile("./file.txt", "utf-8", () => {
    console.log("File Read")
})

setImmediate(() => console.log("I am SetImmediate"))

process.nextTick(() => {     // cb A
    // logic this outer cb calls or more good word -> add to queue (remember -> process.nextTick queue = [A , A1]) a cb immediately || just A finishes A1 is ready there sitting 
    process.nextTick(()   => {  // cb A1
        console.log("I am inner process.nextTick")
        })
    console.log("I am process.nextTick")
    })

function printA() {
    console.log("A = " , a)
}

printA()

console.log("-- I am last line ---")