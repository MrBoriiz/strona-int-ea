const faqItems = document.querySelectorAll(".faq-item");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const animations = new WeakMap();
const targetStates = new WeakMap();

faqItems.forEach((item) => {
    const summary = item.querySelector("summary");
    const answer = item.querySelector(".faq-answer");

    summary.addEventListener("click", (event) => {
        event.preventDefault();

        const currentAnimation = animations.get(item);
        const currentHeight = answer.getBoundingClientRect().height;
        const currentTarget = targetStates.has(item) ? targetStates.get(item) : item.open;
        const shouldOpen = !currentTarget;

        if (currentAnimation) {
            currentAnimation.cancel();
            animations.delete(item);
        }

        targetStates.set(item, shouldOpen);

        if (prefersReducedMotion.matches || typeof answer.animate !== "function") {
            item.open = shouldOpen;
            targetStates.delete(item);
            return;
        }

        if (shouldOpen) {
            item.open = true;
        }

        const targetHeight = shouldOpen ? answer.scrollHeight : 0;
        const animation = answer.animate(
            [
                { height: `${currentHeight}px`, opacity: shouldOpen ? 0 : 1, transform: shouldOpen ? "translateY(-6px)" : "translateY(0)" },
                { height: `${targetHeight}px`, opacity: shouldOpen ? 1 : 0, transform: shouldOpen ? "translateY(0)" : "translateY(-6px)" }
            ],
            {
                duration: 320,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)"
            }
        );

        animations.set(item, animation);
        animation.onfinish = () => {
            if (targetStates.get(item) !== shouldOpen) {
                return;
            }

            if (!shouldOpen) {
                item.open = false;
            }

            animation.cancel();
            animations.delete(item);
            targetStates.delete(item);
        };
    });
});
