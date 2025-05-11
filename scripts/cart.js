export function renderCartContents() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const contentsContainer = document.getElementById("cart-contents");
  const checkoutContainer = document.getElementById("cart-checkout");

  contentsContainer.innerHTML = "";
  checkoutContainer.innerHTML = "";

  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "Your cart is empty.";
    emptyMsg.style.paddingBlock = "1rem";
    contentsContainer.appendChild(emptyMsg);
    updateCartBadge(0);
    return;
  }

  const list = document.createElement("ul");
  list.style.paddingBlock = "1rem";
  list.style.display = "flex";
  list.style.flexDirection = "column";
  list.style.gap = "1rem";

  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalQuantity += item.quantity;
    totalPrice += item.quantity * item.price;

    const li = document.createElement("li");
    li.style.display = "block";

    const options = [];

    if (item.quantity) options.push(item.quantity);
    if (item.size) options.push(formatSize(item.size));
    if (item.color) options.push(capitalize(item.color));

    li.innerHTML = `
      <div style="display: flex; gap: 0.8rem; align-items: flex-start; justify-content: space-between;">
        <div style="display: flex; gap: 0.8rem; align-items: flex-start;">
          <img src="${item.image}" alt="${item.name}" style="width: 2.4rem; height: 2.4rem; object-fit: cover; background-color: var(--smz-white);" />
          <div>
            <p style="font-size: 0.9rem; font-weight: 400;">${item.name}</p>
            <p style="font-size: 0.7rem; opacity: 0.8;">${options.join(" // ")}</p>
            <p style="font-size: 0.7rem; opacity: 0.8;">$${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
        <button data-index="${index}" class="remove-btn" style="background: none; border: none; color: var(--smz-red); font-size: 1.4rem; cursor: pointer;">×</button>
      </div>
`;


    list.appendChild(li);
  });

  contentsContainer.appendChild(list);

  // Checkout Summary
  const summary = document.createElement("div");
  summary.style.paddingBlock = "1rem";
  summary.style.borderTop = "1px solid var(--smz-white)";
  summary.innerHTML = `
    <p><strong>Total Items:</strong> ${totalQuantity}</p>
    <p><strong>Total:</strong> $${totalPrice.toFixed(2)}</p>
  `;

  const checkoutBtn = document.createElement("button");
  checkoutBtn.textContent = "checkout";
  checkoutBtn.className = "submit-button";
  checkoutBtn.style.marginTop = "1rem";

  checkoutContainer.appendChild(summary);
  checkoutContainer.appendChild(checkoutBtn);

  updateCartBadge(totalQuantity);

  // Add remove button functionality
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartContents(); // re-render after removal
    });
  });
}

function updateCartBadge(count) {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-block" : "none";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatSize(size) {
  const map = {
    sm: "Small",
    md: "Medium",
    lg: "Large",
    xl: "X-Large",
    "2xl": "2X-Large",
    "2x-large": "2X-Large",
    "x-large": "X-Large",
    "medium": "Medium",
    "small": "Small",
    "large": "Large"
  };
  return map[size.toLowerCase()] || capitalize(size);
}
