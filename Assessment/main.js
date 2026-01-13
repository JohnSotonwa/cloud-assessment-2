// Variables to manage input, operations, and state
let currentInput = "";        // Tracks current input from user
let firstNumber = "";         // Stores first number before an operation
let secondNumber = "";        // Stores second number after an operation
let operator = null;          // Stores selected operator
let history = [];             // Stores past results
let index = 0;   // Tracks current index in history
let anotherNumber = 1;        // Used to retain previous input after result
let click = 0;                // Used to switch between C and AC button

// Query UI elements
const digits = document.querySelectorAll(".digits-section");   // Number buttons
const operations = document.querySelectorAll(".operations");   // Operator buttons
const equals = document.getElementById("equals");              // Equals button
const clear = document.getElementById("clear");                // Clear button
const backspace = document.getElementById("back-space");       // Backspace button
const innerBox = document.querySelector(".inner-box");         // Display screen
const previous = document.getElementById("previous");          // History button

// Step 1: Capture digit input
digits.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id !== "clear") {
      // Append clicked digit to current input
      currentInput += button.textContent;

      // Display updated input
      innerBox.innerHTML = `<h2>${currentInput}</h2>`;

      // Reset clear button appearance
      clear.classList.remove("clicked");
      clear.textContent = "C";
    }

    // Store latest valid input
    anotherNumber = currentInput;

    // Reset click count for clear button
    click = 0;
  });
});

// Step 2: Capture operator input
operations.forEach((button) => {
  if (button.id !== "equals") {
    button.addEventListener("click", () => {
      // Store selected operator
      operator = button.textContent;

      // Save first number and reset input for second number
      firstNumber = currentInput;
      currentInput = "";

      // Use previous result if available
      if (anotherNumber !== null) {
        firstNumber = anotherNumber;
      }
    });
  }
});

// Step 3: Perform calculation when equals is clicked
equals.addEventListener("click", () => {
  secondNumber = currentInput;
  let result = 0;

  const a = parseFloat(firstNumber);
  const b = parseFloat(secondNumber);

  // Perform calculation based on operator
  if (operator === "+") currentInput = result = a + b;
  else if (operator === "-") currentInput = result = a - b;
  else if (operator === "x") currentInput = result = a * b;
  else if (operator === "÷") currentInput = result = a / b;
  else if (operator === "%") currentInput = result = a % b;
  else if (operator === "^") currentInput = result = a ** b;

  // Display result
  innerBox.innerHTML = `<h2>${currentInput}</h2>`;

  // Save result to history
  history.push(currentInput);
  index = history.length - 2;

  // Store result for potential future operations
  anotherNumber = currentInput;

  // Reset input after calculation
  currentInput = "";
});

// Clear button functionality
clear.addEventListener("click", () => {
  if (click >= 1) {
    // Clear all history on second click
    history = [];
    innerBox.innerHTML = `<h2>${currentInput}</h2>`;
  } else {
    // First click clears just the input
    currentInput = "";
    innerBox.innerHTML = `<h2>${currentInput}</h2>`;
    click += 1;

    // Change button to AC style
    clear.classList.add("clicked");
    clear.innerHTML = `<h2>AC</h2>`;

    // Reset index to latest history
    index = history.length - 1;
  }
});

// Backspace button functionality (removes last three characters)
backspace.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  innerBox.innerHTML = `<h2>${currentInput}</h2>`;
});

// Show previous results from history
previous.addEventListener("click", () => {
  if (history.length === 0) {
    // If history is empty
    innerBox.innerHTML = `<h2>No history</h2>`;
    return;
  }

  // Ensure index is not negative
  if (index < 0) index = 0;

  // Show the result at current index
  innerBox.innerHTML = `<h2>${history[index]}</h2>`;

  // Move to previous entry if not already at the beginning
  if (index > 0) index--;
});

// Allow keyboard input for digits
document.addEventListener('keypress', function(event) {
  if (event.key >= '0' && event.key <= '9') {
    currentInput += event.key;
    innerBox.innerHTML = `<h2>${currentInput}</h2>`;
  }
});
