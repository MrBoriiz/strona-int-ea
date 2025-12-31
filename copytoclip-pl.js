// Function to copy text to the clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
      alert("Skopiowano email do schowka!");
  }).catch(err => {
      console.error("Nie udało się skopiować tekstu do schowka: ", err);
  });
}

// Example usage: Attach this function to a button in your HTML