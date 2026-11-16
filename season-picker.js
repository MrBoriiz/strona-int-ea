(() => {
  function initializeSeasonPicker(select) {
    const picker = document.createElement("div");
    const trigger = document.createElement("button");
    const arrow = document.createElement("span");
    const listbox = document.createElement("div");
    const pickerId = `season-picker-${select.id || "season"}-${document.querySelectorAll(".season-picker").length}`;

    picker.className = "season-picker";
    trigger.className = "season-picker-trigger";
    trigger.type = "button";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", select.getAttribute("aria-label") || "Choose a season");
    trigger.setAttribute("aria-controls", `${pickerId}-options`);
    arrow.className = "season-picker-arrow";
    arrow.setAttribute("aria-hidden", "true");
    listbox.className = "season-picker-options";
    listbox.id = `${pickerId}-options`;
    listbox.setAttribute("role", "listbox");
    listbox.setAttribute("aria-labelledby", `${pickerId}-trigger`);
    trigger.id = `${pickerId}-trigger`;

    const options = Array.from(select.options).map((option, index) => {
      const item = document.createElement("div");
      item.className = "season-picker-option";
      item.setAttribute("role", "option");
      item.dataset.optionIndex = String(index);
      item.textContent = option.textContent;
      item.addEventListener("click", () => {
        select.selectedIndex = index;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        closePicker();
        trigger.focus();
      });
      listbox.append(item);
      return item;
    });

    function syncSelection() {
      const selectedOption = select.options[select.selectedIndex];
      trigger.firstChild.textContent = selectedOption?.textContent || "";
      options.forEach((option, index) => {
        const selected = index === select.selectedIndex;
        option.setAttribute("aria-selected", String(selected));
        option.classList.toggle("is-selected", selected);
      });
    }

    function openPicker() {
      picker.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      listbox.setAttribute("aria-hidden", "false");
      options.forEach((option, index) => option.tabIndex = index === select.selectedIndex ? 0 : -1);
    }

    function closePicker() {
      picker.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      listbox.setAttribute("aria-hidden", "true");
      options.forEach((option) => option.tabIndex = -1);
    }

    function chooseOption(index) {
      const option = select.options[index];
      if (!option) {
        return;
      }
      select.selectedIndex = index;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      closePicker();
      trigger.focus();
    }

    trigger.append(document.createTextNode(""), arrow);
    picker.append(trigger, listbox);
    select.before(picker);
    picker.append(select);
    select.tabIndex = -1;
    select.setAttribute("aria-hidden", "true");
    select.classList.add("season-native-select");
    syncSelection();

    trigger.addEventListener("click", () => {
      if (picker.classList.contains("is-open")) {
        closePicker();
      } else {
        openPicker();
      }
    });

    trigger.addEventListener("keydown", (event) => {
      const currentIndex = select.selectedIndex;
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (!picker.classList.contains("is-open")) {
          openPicker();
        }
        const direction = event.key === "ArrowDown" ? 1 : -1;
        const nextIndex = Math.max(0, Math.min(options.length - 1, currentIndex + direction));
        options.forEach((option, index) => option.tabIndex = index === nextIndex ? 0 : -1);
        options[nextIndex]?.focus();
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (picker.classList.contains("is-open")) {
          chooseOption(currentIndex);
        } else {
          openPicker();
        }
      } else if (event.key === "Escape" && picker.classList.contains("is-open")) {
        event.preventDefault();
        closePicker();
      }
    });

    listbox.addEventListener("keydown", (event) => {
      const focusedIndex = options.indexOf(document.activeElement);
      let nextIndex = focusedIndex;
      if (event.key === "ArrowDown") {
        nextIndex = Math.min(options.length - 1, focusedIndex + 1);
      } else if (event.key === "ArrowUp") {
        nextIndex = Math.max(0, focusedIndex - 1);
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = options.length - 1;
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        chooseOption(focusedIndex);
        return;
      } else if (event.key === "Escape") {
        event.preventDefault();
        closePicker();
        trigger.focus();
        return;
      } else if (event.key === "Tab") {
        closePicker();
        return;
      } else {
        return;
      }
      event.preventDefault();
      options.forEach((option, index) => option.tabIndex = index === nextIndex ? 0 : -1);
      options[nextIndex]?.focus();
    });

    select.addEventListener("change", syncSelection);
    document.addEventListener("pointerdown", (event) => {
      if (!picker.contains(event.target)) {
        closePicker();
      }
    });
  }

  function initialize() {
    document.querySelectorAll("select.season").forEach(initializeSeasonPicker);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
