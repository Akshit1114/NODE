// Just seeing how fastly synchronous code work

console.log("Hello")

var a = 1393232
var b = 9532583

function multiply(a,b) {
    const res = a*b
    return res
}

var c = multiply(a,b)

console.log("Answer : ", c)

// Super fast proving : Time, Tide and JS waits for none