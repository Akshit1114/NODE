/*
concept we know 
in js 

function () {
    const a = 10;
    function b() {
        console.log(b)
    }
}

so outside we cant do 
console.log(a) -> will get not defined

This same concept happens when we do a module require, so IIFE wraps the function inside it and now function's variables or inner function can't be accessed outside

*/



function  Node() {
    console.log("Node js")
}
console.log("Hello")

module.exports = Node;