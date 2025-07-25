const fs = require('fs')

const a = 1000

setTimeout(() => console.log("TimeOut"), 0)

fs.readFile("./file.txt", "utf-8", () => {
    console.log("File Read")
})

setImmediate(() => console.log("SetImmediate"))

function printA() {
    console.log("A = " , a)
}

printA()

console.log("-- I am last line ---")