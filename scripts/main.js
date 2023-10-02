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
      default: {
        if (operationDisplay.textContent === "0") {
          resultDisplay.textContent = "0";
        } else {
          resultDisplay.textContent = "Error";
        }
        return;
      }
    }

    addToHistory();

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
    } else if (operator !== "" && currentValue === "") {
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

  deleteLast.addEventListener("click", function () {
    let currentDisplay = operationDisplay.textContent;

    if (currentDisplay.length > 1 && operator === "") {
      currentDisplay = currentDisplay.slice(0, -1);
      previousValue = currentDisplay;
    } else if (currentDisplay.length === 1 && operator === "") {
      currentDisplay = "0";
      currentValue = "";
      previousValue = "";
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

  // TOGGLE SHOW HISTORY BUTTON
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

  // ADD TO HISTORY
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
