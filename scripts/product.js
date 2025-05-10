const products = {
  "scumbag-t-shirt": {
    name: "Scumbag T-Shirt",
    image: "/images/merch/merch_scumbag.png",
    price: 19.99,
    slug: "scumbag-t-shirt",
    options: {
      sizes: ["sm", "md", "lg", "xl", "2xl"],
      colors: ["black", "grey", "red", "white", "purple"]
    }
  },
  "hangover-sweatshirt": {
    name: "Hangover Sweatshirt",
    image: "/images/merch/merch_hangover.png",
    price: 34.99,
    slug: "hangover-sweatshirt",
    options: {
      sizes: ["sm", "md", "lg", "xl", "2xl"],
      colors: ["black", "white", "red"]
    }
  },
  "butt3rfly-long-sleeve": {
    name: "BUTT3RFLY Long Sleeve",
    image: "/images/merch/merch_butt3rfly.png",
    price: 24.99,
    slug: "butt3rfly-long-sleeve",
    options: {
      sizes: ["sm", "md", "lg", "xl", "2xl"],
      colors: ["black", "white"]
    }
  },
  "mannequin-phone-case": {
    name: "Mannequin Phone Case",
    image: "/images/merch/merch_mannequin.png",
    price: 14.99,
    slug: "mannequin-phone-case",
    options: {
      colors: ["black", "white", "clear"]
    }
  },
  "smz-logo-hat": {
    name: "SMZ Logo Hat",
    image: "/images/merch/merch_hat.png",
    price: 18.99,
    slug: "smz-logo-hat",
    options: {
      colors: ["black", "red", "white"]
    }
  },
  "punk-rock-girl-tote": {
    name: "Punk Rock Girl Tote Bag",
    image: "/images/merch/merch_tote.png",
    price: 12.99,
    slug: "punk-rock-girl-tote"
    // No options
  },
  "slayer-ep-cd": {
    name: "Slayer EP CD",
    image: "/images/merch/merch_slayer.png",
    price: 29.99,
    slug: "slayer-ep-cd"
    // No options
  },
  "wicked-vinyl": {
    name: "Wicked Vinyl",
    image: "/images/merch/merch_wicked.png",
    price: 44.99,
    slug: "wicked-vinyl"
    // No options
  }
};


const params = new URLSearchParams(window.location.search);
const slug = params.get("name");
const product = products[slug];

console.log(product)

if (!product) {
  window.location.href = "/merch/";
} else {
  const productPage = document.querySelector(".product-page");

  // Create image container
  const imageContainer = document.createElement("div");
  imageContainer.className = "merch-image-container";
  imageContainer.innerHTML = `<img src="${product.image}" alt="${product.name}">`;

  // Create details container
  const detailsContainer = document.createElement("div");
  detailsContainer.className = "merch-details-container";
  detailsContainer.innerHTML = `
    <h1>${product.name}</h1>
    <p>$${product.price.toFixed(2)}</p>
    <form id="productForm">
      <input type="hidden" name="name" value="${product.name}" />
    </form>
  `;

  const form = detailsContainer.querySelector("form");

  // Build color options if available
  if (product.options?.colors) {
    const colorFieldset = document.createElement("fieldset");
    colorFieldset.className = "color-selector";

    product.options.colors.forEach((color, i) => {
      const colorId = `color-${color}`;
      const colorDiv = document.createElement("div");
      colorDiv.className = "color-option";

      const border = color === "white" ? "border: 1px solid #ccc;" : "";

      colorDiv.innerHTML = `
        <input type="radio" id="${colorId}" name="color" value="${color}" ${i === 0 ? "checked" : ""} />
        <label for="${colorId}" style="--swatch-color: ${color}; ${border}"></label>
      `;
      colorFieldset.appendChild(colorDiv);
    });

    form.appendChild(colorFieldset);
  }

  // Build size options if available
  if (product.options?.sizes) {
    const sizeFieldset = document.createElement("fieldset");
    sizeFieldset.className = "size-selector";

    product.options.sizes.forEach((size, i) => {
      const sizeId = `size-${size}`;
      const sizeDiv = document.createElement("div");
      sizeDiv.className = "size-option";

      sizeDiv.innerHTML = `
        <input type="radio" id="${sizeId}" name="size" value="${size}" ${i === 0 ? "checked" : ""} />
        <label for="${sizeId}">${size}</label>
      `;
      sizeFieldset.appendChild(sizeDiv);
    });

    form.appendChild(sizeFieldset);
  }

  // Quantity selector
  const quantitySelector = document.createElement("div");
  quantitySelector.className = "quantity-selector";
  quantitySelector.innerHTML = `
    <button type="button" id="decrement">−</button>
    <span id="quantity-display">1</span>
    <button type="button" id="increment">+</button>
    <input type="hidden" name="quantity" id="quantity-input" value="1" />
  `;
  form.appendChild(quantitySelector);

  // Submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "submit-button";
  submitBtn.textContent = "add to cart";
  form.appendChild(submitBtn);

  // Append everything to the product page
  productPage.appendChild(imageContainer);
  productPage.appendChild(detailsContainer);

  // Quantity logic
  let quantity = 1;
  const updateDisplay = () => {
    document.getElementById("quantity-display").textContent = quantity;
    document.getElementById("quantity-input").value = quantity;
    document.getElementById("decrement").disabled = quantity <= 1;
  };

  document.getElementById("increment").addEventListener("click", () => {
    quantity++;
    updateDisplay();
  });

  document.getElementById("decrement").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      updateDisplay();
    }
  });

  updateDisplay();

  // Temporary form handler
  form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("Submitted data:", data);
  });
}
