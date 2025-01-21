const display = document.querySelector("#display");

const isNumber = (value) => {
  try {
    return !isNaN(parseFloat(value));
  } catch (error) {
    return false;
  }
};

const handleEqual = (expression) => {
  try {
    const operators = [];
    const operands = [];
    const expressionArray = expression.split(" ");
    for (part of expressionArray) {
      if (part.trim() === "") {
        continue;
      }
      if ("+-*/sqrtx^2x^ysincostanlogln".includes(part)) {
        operators.push(part.trim());
      } else if (isNumber(part)) {
        operands.push(parseFloat(part.trim()));
      }

      while (operators.length !== 0 && operands.length >= 2) {
        const operator = operators.pop();
        const b = operands.pop();
        let a;
        console.log(operator);

        if (!"sincostanlogln".includes(operator)) {
          a = operands.pop();
        }
        console.log(a, b);
        const res = compute(operator, a, b);
        console.log({ res });
        operands.push(res);
      }
    }

    if (operands.length === 1 && operators.length === 1) {
      const operator = operators.pop();
      const operand = operands.pop();
      const res = compute(operator, operand, 0);
      operands.push(res);
    }
    return operands[0];
  } catch (error) {
    return "Math Error";
  }
};

const compute = (operator, operandA, operandB) => {
  if (operator === "sqrt") {
    return Math.sqrt(operandA);
  }
  if (operator === "sin") {
    return Math.sin(operandA);
  }
  if (operator === "cos") {
    return Math.cos(operandA);
  }
  if (operator === "tan") {
    return Math.tan(operandA);
  }
  if (operator === "+") {
    return operandA + operandB;
  }
  if (operator === "-") {
    return operandA - operandB;
  }
  if (operator === "*") {
    return operandA * operandB;
  }
  if (operator === "/") {
    if (operandB === 0) {
      throw new Error("Division by zero");
    }
    return operandA / operandB;
  }
  if (operator === "x^2") {
    return Math.pow(operandA, 2);
  }
};

const handleButtonClick = (event) => {
  const input = event.target.value;
  if ("0123456789".includes(input)) {
    display.value += input;
  } else if ("+-*/()!.%".includes(input)) {
    display.value += " " + input + " ";
  } else if ("sqrt".includes(input)) {
    display.value += input + " ( " + display.textContent;
  } else if ("x^2" === input) {
    if (display.value.length !== 0) {
      display.value += " * " + display.textContent + " ^ ( 2 )";
    }
  } else if ("x^y" === input) {
    if (display.value.length !== 0) {
      display.value += " " + display.textContent + " ^ ( ";
    }
  } else if (" sin cos tan log ln".includes(input)) {
    if (display.value.length !== 0) {
      display.value += " * " + input + " ( " + display.textContent;
    } else {
      display.value += input + " ( " + display.textContent;
    }
  } else if ("del" === input) {
    display.value = display.value.slice(0, -1);
  } else if ("ac" === input) {
    display.value = "";
  } else if (input === "=") {
    display.value = handleEqual(display.value);
  }
};

buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
