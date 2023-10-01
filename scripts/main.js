document.addEventListener("DOMContentLoaded", function () {
  // Get all the elements (keys and displays)
  const resultDisplay = document.getElementById("resultDisplay");
  const operationDisplay = document.getElementById("operationDisplay");

  const numbers = document.querySelectorAll(".number");
  const operations = document.querySelectorAll(".operator");
  const equalKey = document.getElementById("equal");
  const pi = document.getElementById("pi");
  const clear = document.getElementById("clear");
  const deleteLast = document.getElementById("delete-last");

  const inverseKey = document.getElementById("inverse");
  const squareKey = document.getElementById("square");
  const rootKey = document.getElementById("square-root");

  // Define both values with its operator
  let operator = "";
  let currentValue = "";
  let previousValue = "";
  let resultValue = "";

  // Display number when key is clicked
  numbers.forEach(function (number) {
    number.addEventListener("click", function () {
      displayValue = number.textContent;

      if (operationDisplay.textContent === "0" && operator === "") {
        operationDisplay.textContent = displayValue;
        previousValue = operationDisplay.textContent;
      } else if (operator === "") {
        operationDisplay.textContent += displayValue;
        previousValue = operationDisplay.textContent;
      } else if (operator !== "") {
        operationDisplay.textContent += displayValue;
        currentValue += displayValue;
      }
      console.log(previousValue);
      console.log(currentValue);
    });
  });

  operations.forEach(function (operation) {
    operation.addEventListener("click", function () {
      if (operator !== "" && previousValue !== "") {
        operationDisplay.textContent =
          operationDisplay.textContent.slice(0, -1) + operation.textContent;
        operator = operation.textContent;
        console.log(operator);
      } else if (previousValue !== "") {
        operator = operation.textContent;
        operationDisplay.textContent += operation.textContent;
        console.log(operator);
      }
    });
  });

  equalKey.addEventListener("click", function () {
    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentValue);

    switch (operator) {
      case "+":
        resultValue = num1 + num2;
        break;
      case "-":
        resultValue = num1 - num2;
        break;
      case "x":
        resultValue = num1 * num2;
        break;
      case "÷":
        if (num2 !== 0) {
          resultValue = num1 / num2;
        } else {
          resultDisplay.textContent = "Error";
          return;
        }
        break;
      default:
        if (operationDisplay.textContent === "0") {
          resultDisplay.textContent = "0";
        } else {
          resultDisplay.textContent = "Error";
        }
        return;
    }

    // Actualiza el resultado en el elemento deseado, por ejemplo, "operationDisplay"
    resultDisplay.textContent = resultValue;
    operationDisplay.textContent = resultValue;

    // Actualiza "previousValue" con el resultado para posibles operaciones posteriores
    previousValue = resultValue;

    // Limpia "currentValue" y "operator" para futuros cálculos
    currentValue = "";
    operator = "";
  });

  pi.addEventListener("click", function () {
    if (previousValue === "" && operator === "") {
      previousValue = Math.PI;
      operationDisplay.textContent = previousValue;
    } else if (currentValue !== "" && operator !== "" && currentValue === "") {
      currentValue = Math.PI;
      operationDisplay.textContent += previousValue;
    }
    console.log(previousValue);
    console.log(currentValue);
  });

  clear.addEventListener("click", function () {
    previousValue = "";
    currentValue = "";
    operator = "";
    operationDisplay.textContent = "0";
    resultDisplay.textContent = "0";
  });

  // !! CONTROL ERRORS WHEN OPERATOR IS NOT EMPTY !!
  deleteLast.addEventListener("click", function () {
    let currentDisplay = operationDisplay.textContent;

    if (currentDisplay.length > 1 && operator === "") {
      currentDisplay = currentDisplay.slice(0, -1);
      previousValue = currentDisplay;
    } else if (operator !== "") {
      currentDisplay = "0";
      currentValue = "";
      previousValue = "";
    }
    console.log(previousValue);

    operationDisplay.textContent = currentDisplay;
  });

  inverseKey.addEventListener("click", function () {
    if (operator === "") {
      resultValue = 1 / previousValue;
      previousValue = resultValue;
      operationDisplay.textContent = previousValue || "0";
      resultDisplay.textContent = previousValue || "0";
    } else {
      resultDisplay.textContent = "Error";
    }
  });

  squareKey.addEventListener("click", function () {
    if (operator === "") {
      resultValue = Math.pow(previousValue, 2);
      previousValue = resultValue;
      operationDisplay.textContent = previousValue || "0";
      resultDisplay.textContent = previousValue || "0";
    } else {
      resultDisplay.textContent = "Error";
    }
  });

  rootKey.addEventListener("click", function () {
    if (operator === "") {
      resultValue = Math.sqrt(previousValue);
      previousValue = resultValue;
      operationDisplay.textContent = previousValue || "0";
      resultDisplay.textContent = previousValue || "0";
    } else {
      resultDisplay.textContent = "Error";
    }
  });
});
