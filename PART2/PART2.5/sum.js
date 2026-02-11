console.log("Execute Sum Module")

// ES module or MJS way [and also now u need to set package.json for using this]
export function calculateSum(a,b) {
    const sum = a + b;
    console.log(sum)
}

export const x = 100

