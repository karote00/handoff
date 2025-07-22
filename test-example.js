// Simple test file for inject-docs demonstration

/**
 * calculateSum - - ✅ Similar functionality you need to match - File C (similar functionality): [specific example of p...
 * @returns {*} Return value description
 */
function calculateSum(a, b) {
    return a + b;
}

/**
 * Calculator - - **Component patterns**: class vs functional components - **Component patterns**: class vs function...
 */
class Calculator {
    constructor() {
        this.history = [];
    }
    
    add(x, y) {
        const result = x + y;
        this.history.push(`${x} + ${y} = ${result}`);
        return result;
    }
}

/**
 * multiply - - ✅ Similar functionality you need to match - File C (similar functionality): [specific example of p...
 * @returns {*} Return value description
 */
const multiply = (x, y) => {
    return x * y;
};

export { Calculator, calculateSum, multiply };