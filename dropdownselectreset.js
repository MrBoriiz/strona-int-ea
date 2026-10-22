
function resetDropdown(id) {
    const select = document.getElementById(id);

    if (!(select instanceof HTMLSelectElement) || select.options.length === 0) {
        return;
    }

    select.selectedIndex = 0;
    select.dispatchEvent(new Event("change", { bubbles: true }));
}

function DropdownValueReset() {
    ["mg", "egz", "rdr"].forEach(resetDropdown);
}

function DropdownValueResetMG() {
    resetDropdown("mg");
}

function DropdownValueResetEGZ() {
    resetDropdown("egz");
}