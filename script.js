let runningtotal = 0;
let screenVal = "0";
let prevOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}
function handleNumber(value) {
  if (screenVal === "0") {
    screenVal = value;
  } else {
    screenVal += value;
  }
}
function handleMath(value) {
  if (screenVal === "0") {
    return;
  }
  const intScreenVal = parseInt(screenVal);
  if (runningtotal === 0) {
    runningtotal = intScreenVal;
  } else {
    flushOperation(intScreenVal);
  }
  prevOperator = value;
  screenVal = "0";
}
function flushOperation(intScreenVal) {
  if (prevOperator === "+") {
    runningtotal += intScreenVal;
  } else if (prevOperator === "-") {
    runningtotal -= intScreenVal;
  } else if (prevOperator === "X") {
    runningtotal *= intScreenVal;
  } else if (prevOperator === "÷") {
    runningtotal /= intScreenVal;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      screenVal = "0";
      runningtotal = 0;
      break;
    case "=":
      if (prevOperator === null) {
        return;
      }
      flushOperation(parseInt(screenVal));
      prevOperator = null;
      screenVal = +runningtotal;
      runningtotal = 0;
      break;
    case "←":
      if (screenVal.length === 1) {
        screenVal = "0";
      } else {
        screenVal = screenVal.substring(0, screenVal.length - 1);
      }
      break;

    case "+":
    case "-":
    case "X":
    case "÷":
      handleMath(value);
      break;
  }
}
function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      if (!event.target.classList.contains("calc-button")) {
        return;
      }
      buttonClick(event.target.innerText);
    });
}
function rerender() {
  screen.innerText = screenVal;
}
init();
