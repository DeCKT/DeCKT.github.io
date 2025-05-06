const params = new URLSearchParams(window.location.search)

const name = params.get('name')

console.log(name);

const decrementBtn = document.getElementById("decrement");
const incrementBtn = document.getElementById("increment");
const quantityDisplay = document.getElementById("quantity-display");
const quantityInput = document.getElementById("quantity-input"); // optional hidden input

let quantity = 1;

function updateDisplay() {
  quantityDisplay.textContent = quantity;
  if (quantityInput) quantityInput.value = quantity;
  decrementBtn.disabled = quantity <= 1;
  decrementBtn.classList.toggle("disabled", quantity <= 1);
}

incrementBtn.addEventListener("click", () => {
  quantity++;
  updateDisplay();
});

decrementBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    updateDisplay();
  }
});

// Initialize state
updateDisplay();
