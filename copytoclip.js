const emailCopyButtons = document.querySelectorAll(".email-copy-button");
const copyStatusTimers = new WeakMap();
const copyStatusAnimations = new WeakMap();
const copyRequestIds = new WeakMap();

function updateCopyStatus(button, text, state) {
    const status = button.querySelector(".email-copy-status");
    const currentAnimation = copyStatusAnimations.get(button);

    if (currentAnimation) {
        currentAnimation.cancel();
        copyStatusAnimations.delete(button);
    }

    const updateText = () => {
        status.textContent = text;
        if (state) {
            button.dataset.copyState = state;
        } else {
            button.removeAttribute("data-copy-state");
        }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches
        || typeof status.animate !== "function") {
        updateText();
        return;
    }

    const fadeOut = status.animate(
        [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(-4px)" }
        ],
        { duration: 140, easing: "ease-in", fill: "forwards" }
    );
    copyStatusAnimations.set(button, fadeOut);

    fadeOut.onfinish = () => {
        if (copyStatusAnimations.get(button) !== fadeOut) {
            return;
        }

        updateText();
        fadeOut.cancel();

        const fadeIn = status.animate(
            [
                { opacity: 0, transform: "translateY(4px)" },
                { opacity: 1, transform: "translateY(0)" }
            ],
            { duration: 200, easing: "ease-out", fill: "forwards" }
        );
        copyStatusAnimations.set(button, fadeIn);
        fadeIn.onfinish = () => {
            if (copyStatusAnimations.get(button) !== fadeIn) {
                return;
            }

            fadeIn.cancel();
            copyStatusAnimations.delete(button);
        };
    };
}

function copyUsingSelection(text) {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);

    let copied;
    try {
        input.select();
        copied = document.execCommand("copy");
    } finally {
        input.remove();
    }

    if (!copied) {
        throw new Error("The browser could not copy the selected text.");
    }
}

emailCopyButtons.forEach((button) => {
    const status = button.querySelector(".email-copy-status");

    button.addEventListener("click", async () => {
        const text = button.dataset.copyText;
        const currentTimer = copyStatusTimers.get(button);
        const requestId = (copyRequestIds.get(button) || 0) + 1;
        copyRequestIds.set(button, requestId);

        if (currentTimer) {
            clearTimeout(currentTimer);
            copyStatusTimers.delete(button);
        }

        updateCopyStatus(button, button.dataset.copyPrompt);

        try {
            const supportsClipboardApi = navigator.clipboard
                && (window.location.protocol === "https:" || window.location.hostname === "localhost");

            if (supportsClipboardApi) {
                try {
                    await navigator.clipboard.writeText(text);
                } catch {
                    copyUsingSelection(text);
                }
            } else {
                copyUsingSelection(text);
            }

            if (copyRequestIds.get(button) !== requestId) {
                return;
            }

            updateCopyStatus(button, button.dataset.copySuccess, "success");
            copyStatusTimers.set(button, setTimeout(() => {
                if (copyRequestIds.get(button) !== requestId) {
                    return;
                }

                updateCopyStatus(button, button.dataset.copyPrompt);
                copyStatusTimers.delete(button);
            }, 2500));
        } catch (error) {
            if (copyRequestIds.get(button) !== requestId) {
                return;
            }

            updateCopyStatus(button, button.dataset.copyError, "error");
            console.error("Failed to copy email address:", error);
        }
    });
});
