const display = document.querySelector("#display");

const handleButtonClick = (event) => {
  const input = event.target.value;
  if ("0123456789()".includes(input)) {
    display.value += input;
  } else if ("+-*/".includes(input)) {
    display.value += " " + input + " ";
  } else if ("sqrt 1/x x^2 x^y".includes(input)) {
    display.value += input + " (" + display.textContent;
  } else if ("sin cos tan log ln".includes(input)) {
    if (display.value.length !== 0) {
      display.value += "*" + input + " (" + display.textContent;
    } else {
      display.value += input + " (" + display.textContent;
    }
  } else if (input === "=") {
    display.value = eval(display.value);
  }
};

buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
