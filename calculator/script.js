const numberButtons = document.querySelectorAll(".button");
const inputBox = document.querySelector(".calculator-screen");
const para = document.getElementById("para");

let calculation = "";
let negativeFlag = false;

function evaluateExpression(expression) {
  try {
    const withExplicitMultiplication = expression.replace(
      /([\d.]+)([(])/g,
      "$1*$2"
    );
    const withoutPercentage = withExplicitMultiplication.replace(/%/g, "/100");
    const withDivideSymbol = withoutPercentage.replace(/÷/g, "/");
    const withExponentiationSymbol = withDivideSymbol.replace(/\^/g, "**");
    return Function(`'use strict'; return (${withExponentiationSymbol})`)();
  } catch (error) {
    return null;
  }
}

function handleSignChange() {
  if (inputBox.value === "") {
    inputBox.value = "-";
    calculation += "-";
  } else if (inputBox.value === "-") {
    inputBox.value = "";
    calculation = calculation.slice(0, -1);
  } else {
    const currentValue = parseFloat(inputBox.value);
    const newValue = -currentValue;
    inputBox.value = newValue;
    calculation =
      calculation.slice(0, -currentValue.toString().length) + newValue;
  }
  para.innerText = calculation;
}

function handler() {
  const buttonText = this.innerText;
  if (buttonText === "AC") {
    inputBox.value = "";
    calculation = "";
    para.innerText = "";
  } else if (buttonText === "C") {
    inputBox.value = inputBox.value.slice(0, -1);
    calculation = calculation.slice(0, -1);
    para.innerText = calculation;
  } else if (buttonText === "=") {
    const result = evaluateExpression(calculation);
    inputBox.value = result !== null ? result : "";
    para.innerText = calculation + " = " + inputBox.value;
  } else if (buttonText === "%") {
    const percentage = evaluateExpression(calculation) / 100;
    inputBox.value = percentage;
    calculation = percentage.toString();
    para.innerText = calculation;
  } else if (buttonText === ".") {
    if (!calculation.includes(".")) {
      inputBox.value += buttonText;
      calculation += buttonText;
      para.innerText = calculation;
    }
  } else if (buttonText === "√") {
    const sqrt = Math.sqrt(evaluateExpression(calculation));
    inputBox.value = sqrt;
    calculation = sqrt.toString();
    para.innerText = calculation;
  } else if (buttonText === "(" || buttonText === ")") {
    inputBox.value += buttonText;
    calculation += buttonText;
    para.innerText = calculation;
  } else if (buttonText === "÷" || buttonText === "^") {
    inputBox.value += buttonText;
    calculation += buttonText;
    para.innerText = calculation;
  } else if (buttonText === "+/-") {
    handleSignChange();
  } else {
    if (!isNaN(buttonText) || ["+", "-", "*", "/"].includes(buttonText)) {
      inputBox.value += buttonText;
      calculation += buttonText;
      para.innerText = calculation;
    }
  }
}

numberButtons.forEach(function (button) {
  button.addEventListener("click", handler);
});

inputBox.addEventListener("keydown", function (event) {
  event.preventDefault();
});

document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (key === "Enter") {
    const result = evaluateExpression(calculation);
    inputBox.value = result !== null ? result : "";
    para.innerText = calculation + " = " + inputBox.value;
  } else if (key === "Backspace") {
    inputBox.value = inputBox.value.slice(0, -1);
    calculation = calculation.slice(0, -1);
    para.innerText = calculation;
  } else if (
    !isNaN(key) ||
    ["+", "-", "*", "/", ".", "%", "(", ")", "÷", "^"].includes(key)
  ) {
    inputBox.value += key;
    calculation += key;
    para.innerText = calculation;
  }
});
