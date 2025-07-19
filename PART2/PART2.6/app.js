

// Strict Mode --------------------- (in es module)

// import {x, calculateSum} from "./sum.js"
// var a = 10
// var b = 12
// calculateSum(a,b)

// console.log(x)



// non strict mode -------------------- (in commonjs module)

const {x, calculateSum} = require("./sum")

var a = 10
var b = 12
calculateSum(a,b)

console.log(x)
