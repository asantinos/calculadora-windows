document.addEventListener("DOMContentLoaded", function () {
  // Get the display the 
  const resultDisplay = document.getElementById("resultDisplay");
  const operationDisplay = document.getElementById("operationDisplay");

  // Define the values and its operator
  let currentValue = "";
  let previousValue = "";
  let operator = "";

  function updateDisplay() {
    // Show the typed number in the display
    let displayValue = currentValue;

    // Show the values and operator in the display
    if (operator) {
      displayValue = `${previousValue} ${operator} ${currentValue}`;
    }

    // Show the result or 0 if there is no operator
    operationDisplay.textContent = displayValue || "0";
  }

  const keys = document.querySelectorAll(".key");
  keys.forEach(function (key) {
    key.addEventListener("click", function () {
      const keyValue = key.textContent;

      switch (keyValue) {
        case "C":
          // Delete both display and operation
          currentValue = "";
          operator = "";
          previousValue = "";
          break;
        case "π":
          // Delete both display and operation
          currentValue = "";
          operator = "";
          previousValue = "";
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
              operator = keyValue;
              previousValue = currentValue;
              currentValue = "";
            } else {
              // Set operator
              operator = keyValue;
              previousValue = currentValue;
              currentValue = "";
            }
          }
          break;
      }

      updateDisplay();
    });
  });
});
