// In part2.1 we our importing or getting other module/file code, and running here as this file act as entry point of execution or run

// will use require funtion to bring/import the code here [require is like globalThis present everyone can use from anywhere in node]

require("./other-module")
const calculateSum =  require("./sum")
var a = 10
var b = 12
console.log(calculateSum)
calculateSum(a,b)
// console.log(globalThis)
