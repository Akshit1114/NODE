console.log("Hello")

var a = 93583
var b = 93593

// concept of setTimeOut for 0 sec  , so this is async task and libuv can send the callback once the call stack is finished executing all the code or GEC is popped out
setTimeout(() => {
    console.log("Call me right now")
}, 0)        // trust issuess with settimeout :(  )


setTimeout(() => {
    console.log("Call me after 3sec")
}, 3000)

function multiply(a,b) {
    const result = a*b
    return result
}

var c = multiply(a,b)
console.log("Answer: ", c)

/*
console.log("Hello")

var a = 93583
var b = 93593

// concept of setTimeOut for 0 sec  , so this is async task and libuv can send the callback once the call stack is finished executing all the code or GEC is popped out
setTimeout(() => {
    console.log("Call me right now")
}, 0)        // trust issuess with settimeout :(  )


setTimeout(() => {
    console.log("Call me after 3.1sec")
}, 3000)

setTimeout(() => {
    console.log("Call me after 5sec")
}, 5000)

setTimeout(() => {
    console.log("Call me after 3.2sec")
}, 3000)


function multiply(a,b) {
    const result = a*b
    return result
}

var c = multiply(a,b)
console.log("Answer: ", c)
*/