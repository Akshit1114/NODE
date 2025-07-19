console.log("Execute Sum Module")

function calculateSum(a,b) {
    const sum = a + b;
    console.log(sum)
}

const x = 100

module.exports = {
    calculateSum : calculateSum,
    x : x
}