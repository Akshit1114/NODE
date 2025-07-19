console.log("Execute Sum Module")

// ES module way [and also now u dont need to set package.json for using this]
export function calculateSum(a,b) {
    const sum = a + b;
    console.log(sum)
}

export const x = 100

