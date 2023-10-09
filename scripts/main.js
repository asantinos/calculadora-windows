/**
 * @author asantinos
 * @version 1.0.0
 * Created on 2020-03-10
 * Github respositorie: https://github.com/asantinos/calculadora-windows
 *
 */

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

  const percentageKey = document.getElementById("percentage");
  const inverseKey = document.getElementById("inverse");
  const squareKey = document.getElementById("square");
  const rootKey = document.getElementById("square-root");
  const negativeKey = document.getElementById("negative");

  // Define both values with its operator and the result value
  let operator = "";
  let currentValue = "";
  let previousValue = "";
  let resultValue = "";
  let isNewOperation = true;

  // Assign values to operate with and display them when keys are clicked
  numbers.forEach(function (number) {
    number.addEventListener("click", function () {
      displayValue = number.textContent;

      if (
        (operationDisplay.textContent === "0" && operator === "") ||
        isNewOperation
      ) {
        operationDisplay.textContent = displayValue;
        previousValue = operationDisplay.textContent;
        isNewOperation = false;
      } else if (operator === "") {
        operationDisplay.textContent += displayValue;
        previousValue = operationDisplay.textContent;
      } else if (operator !== "") {
        operationDisplay.textContent += displayValue;
        currentValue += displayValue;
      }
    });
  });

  // Assign operator and display value when key is clicked
  operations.forEach(function (operation) {
    operation.addEventListener("click", function () {
      if (operator !== "" && previousValue !== "") {
        operationDisplay.textContent =
          operationDisplay.textContent.slice(0, -1) + operation.textContent;
        operator = operation.textContent;
      } else if (previousValue !== "") {
        operator = operation.textContent;
        operationDisplay.textContent += operation.textContent;
      }
      // After an opeation, if the person click on an operation key, new operation will be false
      isNewOperation = false;
    });
  });

  // Make the operation with the values and operator selected
  equalKey.addEventListener("click", function () {
    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentValue);

    if (!isNaN(num1) && !isNaN(num2) && operator !== "") {
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
            resultValue = "Error";
          }
          break;
        default: {
          if (operationDisplay.textContent === "0") {
            resultValue = "0";
          } else {
            resultValue = num1;
          }
          return;
        }
      }
      // If user inserts previous value and operator but not current value
    } else if (!isNaN(num1) && operator !== "") {
      resultValue = "Error";
      // If user only inserts previous value
    } else if (!isNaN(num1) && operator === "") {
      resultValue = num1;
      // If user not insert any value
    } else {
      resultValue = "0";
    }

    // Update both displays to show the result
    // Add operation with result to history
    resultDisplay.textContent = resultValue;
    addToHistory();
    operationDisplay.textContent = resultValue;

    // Assign the result to the new previous value
    previousValue = resultValue;

    // Reset current value and operator
    currentValue = "";
    operator = "";

    // Set new operation to true
    isNewOperation = true;
  });

  // Change sign of number (positive or negative)
  // Control when to change it to the previous or current value
  negativeKey.addEventListener("click", function () {
    if (previousValue !== "" && operator === "") {
      previousValue = -previousValue;
      operationDisplay.textContent = previousValue;
    } else if (operator !== "" && currentValue !== "") {
      currentValue = -currentValue;
      const expressionBeforeOperator =
        operationDisplay.textContent.split(operator)[0];
      operationDisplay.textContent =
        expressionBeforeOperator + operator + currentValue;
    }
  });

  // Divide value of previous or current value by 100
  percentageKey.addEventListener("click", function () {
    if (previousValue !== "" && operator === "") {
      previousValue = previousValue / 100;
      operationDisplay.textContent = previousValue;
    } else if (operator !== "" && currentValue !== "") {
      currentValue = currentValue / 100;
      const expressionBeforeOperator =
        operationDisplay.textContent.split(operator)[0];
      operationDisplay.textContent =
        expressionBeforeOperator + operator + currentValue;
    }
  });

  // Assign PI value to previous or current value
  pi.addEventListener("click", function () {
    if (previousValue === "" && operator === "") {
      previousValue = Math.PI;
      operationDisplay.textContent = previousValue;
    } else if (operator !== "" && currentValue === "") {
      currentValue = Math.PI;
      operationDisplay.textContent += currentValue;
    }
  });

  // DELETE KEYS //
  // Delete and reset all values and operator
  clear.addEventListener("click", function () {
    previousValue = "";
    currentValue = "";
    operator = "";
    operationDisplay.textContent = "0";
    resultDisplay.textContent = "0";
  });

  // Delete last number from the display and update the value
  deleteLast.addEventListener("click", function () {
    let currentDisplay = operationDisplay.textContent;

    if (currentDisplay.length > 1 && operator === "") {
      currentDisplay = currentDisplay.slice(0, -1);
      previousValue = currentDisplay;
    } else if (
      (currentDisplay.length === 1 && operator === "") ||
      operator !== ""
    ) {
      currentDisplay = "0";
      previousValue = "";
      currentValue = "";
      isNewOperation = true;
    }

    operationDisplay.textContent = currentDisplay;
  });

  // ONLY PREVIOUS VALUE OPERATIONS //
  // Divide 1 by the previous value
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

  // Square of the previous value
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

  // Root square of the previous value
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

  // HISTORY //
  // Toggle show/hide history
  const toggleHistoryButton = document.getElementById("toggle-history");

  const historyContainer = document.querySelector(".history-container");
  toggleHistoryButton.addEventListener("click", function () {
    const isHistoryVisible = historyContainer.classList.contains("visible");

    if (isHistoryVisible) {
      historyContainer.classList.remove("visible");
    } else {
      historyContainer.classList.add("visible");
    }
  });

  // Add operation to the history
  function addToHistory() {
    const operationText = operationDisplay.textContent;
    const resultText = resultDisplay.textContent;

    if (operationText !== " && " && resultText !== "") {
      const historyItem = document.createElement("div");
      historyItem.innerHTML = `
        <div class="history-data">
          <span>${operationText}</span>
          <span class="history-result">${resultText}</span>
        </div>
        `;
      historyContainer.appendChild(historyItem);

      const deleteHistory = document.getElementById("delete-history");
      deleteHistory.addEventListener("click", function () {
        while (historyContainer.childNodes.length > 2) {
          historyContainer.removeChild(historyContainer.lastChild);
        }
      });
    }
  }
});
