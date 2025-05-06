document.addEventListener("DOMContentLoaded", () => {
  const filterPanel = document.querySelector("#filter-panel");
  const filterToggleBtn = document.querySelector("#filter-toggle");
  const merchItems = document.querySelectorAll("#merch-list li");
  const allRow = document.querySelector('.filter-row[data-category="all"]');
  const allIndicator = allRow?.querySelector('.filter-indicator');
  const filterRows = document.querySelectorAll(".filter-row");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  // Initialize filter state
  const filterState = {
    all: true,
    apparel: {
      tshirt: true,
      longsleeve: true,
      sweatshirt: true,
    },
    accessories: {
      hats: true,
      phonecase: true,
      bags: true,
    },
    music: {
      vinyl: true,
      cd: true,
    }
  };

  function allFiltersSelected() {
    return Object.values(filterState)
      .filter(v => typeof v === "object")
      .flatMap(group => Object.values(group))
      .every(v => v === true);
  }
  

  // Toggle dropdown menus
  dropdownToggles.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetId = btn.dataset.target;
      const targetList = document.getElementById(targetId);
    
      const isOpen = targetList.classList.toggle("open");
      btn.classList.toggle("open", isOpen);
    });
    
  });
  

  // Toggle filters
  filterRows.forEach(row => {
    row.addEventListener("click", () => {
      const cat = row.dataset.category;
      if (!cat) return;

      // Handle ALL toggle
      if (cat === "all") {
        const allEnabled = !filterState.all;
        filterState.all = allEnabled;
      
        Object.keys(filterState).forEach(key => {
          if (typeof filterState[key] === "object") {
            Object.keys(filterState[key]).forEach(sub => {
              filterState[key][sub] = allEnabled;
            });
          }
        });
      
        updateUI();
        return;
      }
      

      // Handle category or subcategory
      else {
        const parent = row.closest("ul").previousElementSibling?.dataset?.category;
        if (parent && filterState[parent]) {
          // It's a subfilter
          const sub = cat;
          filterState[parent][sub] = !filterState[parent][sub];
        } else {
          // It's a category toggle
          const group = cat;
          const newValue = !getGroupState(group).every(val => val === true);
          Object.keys(filterState[group]).forEach(sub => filterState[group][sub] = newValue);
        }

        // Any custom toggle disables "all"
        filterState.all = false;
      }

      updateUI();
    });
  });

  function getGroupState(group) {
    return Object.values(filterState[group]);
  }

  function updateUI() {
    filterState.all = allFiltersSelected();


    // Update indicators
    updateIndicators();

    // Show/hide merch
    merchItems.forEach(item => {
      const categories = item.dataset.category.split(" ");
      const isVisible = categories.some(cat => {
        for (const group in filterState) {
          if (typeof filterState[group] === "object" && filterState[group][cat]) return true;
        }
        return false;
      });
      item.style.display = isVisible ? "block" : "none";
    });
  }

  function updateIndicators() {
    // "All"
    if (allIndicator) {
      allIndicator.textContent = filterState.all ? "x" : " ";
      allIndicator.parentElement.classList.toggle("is-x", filterState.all);
    }


    // Categories and subcategories
    for (const group in filterState) {
      if (typeof filterState[group] !== "object") continue;

      const parentEl = document.querySelector(`.filter-row[data-category="${group}"] .filter-indicator`);
      const groupState = getGroupState(group);
      const selectedCount = groupState.filter(Boolean).length;

      parentEl.textContent = selectedCount === 0 ? " " : selectedCount === groupState.length ? "x" : `${selectedCount}`;

      for (const sub in filterState[group]) {
        const subEl = document.querySelector(`.filter-row.sub[data-category="${sub}"] .filter-indicator`);
        if (subEl) {
          subEl.textContent = filterState[group][sub] ? "x" : " ";
        }
      }
    }
  }

  filterToggleBtn.addEventListener("click", () => {
    filterPanel.classList.toggle("open");
  });
  

  updateUI(); // Initial render
});
