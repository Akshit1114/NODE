console.log("Execute Sum Module")

function calculateSum(a,b) {
    const sum = a + b;
    console.log(sum)
}

const x = 99;

console.log(module.exports)  // here module.exports = {} -> object

// so some people also do
// module.exports.calculateSum = calculateSum  // its like object.calculateSum
// module.exports.x = x

module.exports = {calculateSum,x};

console.log(module.exports)