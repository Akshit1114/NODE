console.log("Execute Sum Module")

function calculateSum(a,b) {
    const sum = a + b;
    console.log(sum)
}

const x = 99;
module.exports.x = x
// console.log(module.exports)  // here module.exports = {} -> object

// // so some people also do
// module.exports.calculateSum = calculateSum  // its like object.calculateSum
// module.exports.x = x

module.exports = {calculateSum,x};

console.log(module.exports)





// | Style                              | What it does            |
// | ---------------------------------- | ----------------------- |
// | `module.exports.calculateSum = fn` | Mutates existing object |
// | `module.exports = { ... }`         | Replaces the object     |
