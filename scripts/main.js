document.addEventListener("DOMContentLoaded", function () {
  // Get all the elements (keys and displays)
  const resultDisplay = document.getElementById("resultDisplay");
  const operationDisplay = document.getElementById("operationDisplay");
  const keys = document.querySelectorAll(".key");
  const inverseKey = document.getElementById("inverse");
  const squareKey = document.getElementById("square");
  const rootKey = document.getElementById("square-root");

  // Define both values with its operator
  let currentValue = "";
  let previousValue = "";
  let operator = "";
  let resultValue = "";

  // Inverse key function
  inverseKey.addEventListener("click", function () {
    resultValue = 1 / currentValue;
    displayValue = resultValue;
    operationDisplay.textContent = "0";
  });

  squareKey.addEventListener("click", function () {
    resultValue = Math.pow(currentValue, 2);
    displayValue = resultValue;
    operationDisplay.textContent = displayValue || "0";
  });

  rootKey.addEventListener("click", function () {
    resultValue = Math.sqrt(currentValue);
    displayValue = resultValue;
    operationDisplay.textContent = displayValue || "0";
  });

  function updateOperationDisplay() {
    // Set display value to typed number
    let displayValue = currentValue;

    // Show the values and operator in the display
    if (operator) {
      displayValue = `${previousValue} ${operator} ${currentValue}`;
    }

    // Show the result or 0 if there is no operator
    operationDisplay.textContent = displayValue || "0";
  }

  function updateResultDisplay() {
    // Show the typed number in the display
    let displayValue = resultValue;

    // Show the result or 0 if there is no operator
    resultDisplay.textContent = displayValue || "0";
  }

  keys.forEach(function (key) {
    key.addEventListener("click", function () {
      const keyValue = key.textContent;

      switch (keyValue) {
        case "%":
          break;
        case "π":
          currentValue = Math.PI;
          break;
        case "C":
          // Delete both display and operation
          currentValue = "";
          previousValue = "";
          operator = "";
          resultValue = "";
          break;
        case "⬅":
          // Delate last digit on display
          currentValue = currentValue.slice(0, -1);
          break;
        case "+/-":
          // Change sign (+/-) on display
          currentValue = (-parseFloat(currentValue)).toString();
          break;
        case "=":
          // Make operation
          if (previousValue !== "") {
            switch (operator) {
              case "+":
                resultValue = (
                  parseFloat(previousValue) + parseFloat(currentValue)
                ).toString();
                currentValue = resultValue;
                break;
              case "-":
                resultValue = (
                  parseFloat(previousValue) - parseFloat(currentValue)
                ).toString();
                currentValue = resultValue;

                break;
              case "x":
                resultValue = (
                  parseFloat(previousValue) * parseFloat(currentValue)
                ).toString();
                currentValue = resultValue;

                break;
              case "÷":
                resultValue = (
                  parseFloat(previousValue) / parseFloat(currentValue)
                ).toString();
                currentValue = resultValue;

                break;
            }
            operator = "";
            previousValue = "";
          }
          break;
        default:
          // Error management
          if (!isNaN(keyValue) || keyValue === ".") {
            currentValue += keyValue;
          } else {
            if (previousValue !== "") {
              // Make operation
              switch (operator) {
                case "+":
                  currentValue = (
                    parseFloat(previousValue) + parseFloat(currentValue)
                  ).toString();
                  break;
                case "-":
                  currentValue = (
                    parseFloat(previousValue) - parseFloat(currentValue)
                  ).toString();
                  break;
                case "x":
                  currentValue = (
                    parseFloat(previousValue) * parseFloat(currentValue)
                  ).toString();
                  break;
                case "÷":
                  currentValue = (
                    parseFloat(previousValue) / parseFloat(currentValue)
                  ).toString();
                  break;
              }
              previousValue = currentValue;
              currentValue = "";
              operator = keyValue;
            } else {
              // Set operator
              operator = keyValue;
              previousValue = currentValue;
              currentValue = "";
            }
          }
          break;
      }

      updateOperationDisplay();
      updateResultDisplay();
    });
  });
});
