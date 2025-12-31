// Function to copy text to the clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
      alert("Text copied to clipboard!");
  }).catch(err => {
      console.error("Failed to copy text: ", err);
  });
}

// Example usage: Attach this function to a button in your HTML