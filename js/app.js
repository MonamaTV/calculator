const display = document.querySelector("#display");

const isNumber = (value) => {
  try {
    return !isNaN(parseFloat(value));
  } catch (error) {
    return false;
  }
};

const factorial = (n) => {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
};

const isTrigFunction = (value) => "sin cos tan ln log sqrt".includes(value);
const isSingleOperandOperator = (value) => "!%".includes(value);

const handleEqual = (expression) => {
  try {
    const operators = [];
    const operands = [];
    const expressionArray = expression.split(" ");
    for (part of expressionArray) {
      if (part.trim() === "") {
        continue;
      }
      const isTrig = isTrigFunction(part);
      if ("+-*/sqrtx^2x^y%!".includes(part) || isTrig) {
        operators.push(part.trim());
      } else if (isNumber(part)) {
        operands.push(parseFloat(part.trim()));
      }

      if (isTrig && operands.length !== 0) {
        const operator = operators.pop();
        const b = operands.pop();
        const res = compute(operator, b, 0);
        operands.push(res);
      } else {
        while (operators.length !== 0 && operands.length >= 2) {
          const operator = operators.pop();
          const b = operands.pop();
          const a = operands.pop();
          const res = compute(operator, b, a);
          operands.push(res);
        }
      }
    }
    if (operands.length === 1 && operators.length === 1) {
      const operator = operators.shift();
      const operand = operands.shift();
      const res = compute(operator, operand, 0);
      operands.push(res);
    }
    return operands[0];
  } catch (error) {
    return "Math Error";
  }
};

const compute = (operator, operandA, operandB) => {
  if (operator === "pie") {
    return Math.PI;
  }
  if (operator === "sqrt") {
    return Math.sqrt(operandA);
  }
  if (operator === "sin") {
    return Math.round(Math.sin((operandA * Math.PI) / 180));
  }
  if (operator === "cos") {
    return Math.round(Math.cos((operandA * Math.PI) / 180));
  }
  if (operator === "tan") {
    return Math.round(Math.tan((operandA * Math.PI) / 180));
  }
  if (operator === "log") {
    return Math.round(Math.log10(operandA));
  }
  if (operator === "ln") {
    return Math.round(Math.log(operandA));
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
  if (operator === "%") {
    return operandA / 100;
  }
  if (operator === "!") {
    return factorial(operandA);
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
  } else if (isTrigFunction(input)) {
    if (
      display.value.length !== 0 &&
      display.value[display.value.length - 1] !== " "
    ) {
      display.value += " * " + input + " ( " + display.textContent;
    } else {
      display.value += input + " ( " + display.textContent;
    }
  } else if ("pie" === input) {
    display.value += Math.PI;
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
