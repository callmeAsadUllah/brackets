function calculate(a, b, operation) {
    switch (operation) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                throw new Error("Division by zero is not allowed");
            }
            return a / b;
        default:
            throw new Error("Invalid operation");
    }
}
calculate(1, 2, "-");
