// Part1
/* console.log("Execute Sum Module")
function calculateSum(a,b) {
    const sum = a + b;
    console.log(sum)
}

const x = 100

module.exports = {
    addKarDo : calculateSum,
    yehXVariableHai : x
}
*/

// Part2
/* console.log("Execute Sum Module")
function calculateSum(a,b) {
    const sum = a + b;
    console.log(sum)
}

const x = 100

module.exports = {
    addKarDo : calculateSum,
    yehXVariableHai : x
}
*/

// Part 3
//  console.log("Execute Sum Module")
// function calculateSum(a,b) {
//     const sum = a + b;
//     console.log(sum)
// }

// const x = 100

// module.exports = {
//     calculateSum,
//     x

// }
/* 
can't do         write directly if use different names
module.exports = {
    addKarDo,
    yehXVariableHai
}
 */

// Part4
// function calculateSum(a,b) {
//     const sum = a + b;
//     console.log(sum)
// }

// const x = 100

// module.exports = {
//     calculateSum : calculateSum(),
//     x : x
// }
/*
⚙️ Breakdown:
calculateSum() gets called at the time of export, with no arguments (a and b are undefined).

Inside the function:
const sum = undefined + undefined  // results in NaN
console.log(NaN)
The return value of calculateSum() is undefined (since you didn't return anything).

So module.exports becomes:
{
    calculateSum: undefined,
    x: 100
}
📦 When you import:
const obj = require("./sum");
console.log(obj); // { calculateSum: undefined, x: 100 }
obj.calculateSum(a, b); // ❌ Error: obj.calculateSum is not a function
*/